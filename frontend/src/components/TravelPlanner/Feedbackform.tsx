import React, { useState, useEffect } from "react";
import { Clock, Mail, Check, AlertTriangle } from "lucide-react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

interface FeedbackEmailSystemProps {
  isDarkMode: boolean;
  tripData?: {
    destination: string;
    returnDate: string;
  };
}

// Auth service functions
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Optional: Add user to Firestore
  return user;
};

export const doSignInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Optional: Add user to Firestore
  return user;
};

export const doSignOut = () => {
  return auth.signOut();
};

const FeedbackEmailSystem: React.FC<FeedbackEmailSystemProps> = ({ 
  isDarkMode, 
  tripData = { 
    destination: "Manali", 
    returnDate: "2025-04-10"
  } 
}) => {
  const [emailStatus, setEmailStatus] = useState<"pending" | "scheduled" | "sent" | "error">("pending");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email || "");
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Calculate when to send the feedback email (1 day after return)
    if (tripData.returnDate) {
      const returnDate = new Date(tripData.returnDate);
      const feedbackDate = new Date(returnDate);
      feedbackDate.setDate(returnDate.getDate() + 1);
      
      setScheduledDate(feedbackDate.toISOString().split('T')[0]);
      
      // Check if the return date has passed
      const today = new Date();
      if (returnDate <= today) {
        setEmailStatus("sent");
      } else {
        setEmailStatus("scheduled");
      }
    }
  }, [tripData]);

  const handleSendNow = () => {
    // Verify user is authenticated before sending
    if (!isAuthenticated) {
      alert("Please sign in to send feedback emails");
      return;
    }
    
    // Simulate sending the email immediately
    // In a real app, you would call your email service here with userEmail
    console.log(`Sending feedback email to ${userEmail}`);
    setEmailStatus("sent");
  };

  const handleReschedule = () => {
    // In a real app, this would open a date picker
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 3);
    setScheduledDate(newDate.toISOString().split('T')[0]);
    setEmailStatus("scheduled");
  };

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      const user = provider === "google" 
        ? await doSignInWithGoogle()
        : await doSignInWithGitHub();
      
      console.log(`Signed in with ${provider}, email: ${user.email}`);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Mail className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
        <h1 className="text-2xl font-bold text-gray-500">Feedback Email System</h1>
      </div>

      {/* Authentication status */}
      <div className={`p-4 mb-4 rounded-lg ${
        isDarkMode 
          ? isAuthenticated ? "bg-green-900/20 border border-green-800/30" : "bg-yellow-900/20 border border-yellow-800/30"
          : isAuthenticated ? "bg-green-50 border border-green-100" : "bg-yellow-50 border border-yellow-100"
      }`}>
        {isAuthenticated ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Check className={`h-5 w-5 ${isDarkMode ? "text-green-400" : "text-green-500"}`} />
              <span className={isDarkMode ? "text-green-300" : "text-green-700"}>
                Signed in as: {userEmail}
              </span>
            </div>
            <button 
              onClick={() => doSignOut()}
              className={`px-3 py-1 rounded-md text-sm ${
                isDarkMode 
                  ? "bg-gray-600 hover:bg-gray-500 text-gray-200" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-5 w-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`} />
              <span className={isDarkMode ? "text-yellow-300" : "text-yellow-700"}>
                Please sign in to use the feedback email system
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSignIn("google")}
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode 
                    ? "bg-blue-600 hover:bg-blue-500 text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Google Sign In
              </button>
              <button 
                onClick={() => handleSignIn("github")}
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode 
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-200" 
                    : "bg-gray-700 hover:bg-gray-800 text-white"
                }`}
              >
                GitHub Sign In
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
        <div className="mb-6">
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Post-Trip Feedback
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            A feedback form will be automatically emailed to travelers after their return date to collect
            valuable insights about their trip experience.
          </p>

          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} mb-6`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  Trip to {tripData.destination}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Return Date: {tripData.returnDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Email scheduled for: {scheduledDate}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  emailStatus === "sent" ? "bg-green-500" : 
                  emailStatus === "scheduled" ? "bg-blue-500" : 
                  emailStatus === "error" ? "bg-red-500" : "bg-yellow-500"
                }`}></div>
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status: {emailStatus.charAt(0).toUpperCase() + emailStatus.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isDarkMode 
                      ? "bg-gray-600 hover:bg-gray-500 text-gray-200" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
                {emailStatus !== "sent" && (
                  <button 
                    onClick={handleSendNow}
                    className={`px-3 py-1 rounded-md text-sm ${
                      isDarkMode 
                        ? "bg-blue-600 hover:bg-blue-500 text-white" 
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    } ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!isAuthenticated}
                  >
                    Send Now
                  </button>
                )}
                {emailStatus !== "sent" && (
                  <button 
                    onClick={handleReschedule}
                    className={`px-3 py-1 rounded-md text-sm ${
                      isDarkMode 
                        ? "bg-gray-600 hover:bg-gray-500 text-gray-200" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    } ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!isAuthenticated}
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          </div>

          {showPreview && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
            } mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  Email Preview
                </h3>
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Recipient: {isAuthenticated ? userEmail : "Not signed in"}
                </span>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="border-b pb-3 mb-3">
                  <p className="font-medium">Subject: How was your trip to {tripData.destination}?</p>
                </div>
                <div className="space-y-3">
                  <p>Hello,</p>
                  <p>We hope you had an amazing time in {tripData.destination}! As your travel companions at PackUpPal, we'd love to hear about your experience.</p>
                  <p>Please take a moment to complete our short feedback form. Your insights will help us improve our service and assist other travelers planning their own adventures.</p>
                  <div className={`p-2 text-center my-4 ${
                    isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"
                  } rounded-md`}>
                    [Complete Feedback Form]
                  </div>
                  <p>Thank you for choosing PackUpPal for your travel planning needs!</p>
                  <p>Safe travels,<br/>The PackUpPal Team</p>
                </div>
              </div>
            </div>
          )}

          <div className={`flex items-center gap-3 p-4 rounded-lg ${
            isDarkMode ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50 border border-blue-100"
          }`}>
            <div className="p-2 rounded-full bg-blue-100">
              <Check className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className={`font-medium ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
                Automated System
              </p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Feedback emails are automatically sent to the authenticated user's email address based on trip return dates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Email Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="send-feedback" 
                  checked={true} 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="send-feedback" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Send feedback request emails
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Timing:</span>
                <select className={`text-sm rounded-md ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-gray-200" 
                    : "bg-white border-gray-300 text-gray-700"
                }`}>
                  <option>1 day after return</option>
                  <option>2 days after return</option>
                  <option>3 days after return</option>
                  <option>1 week after return</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="include-photos" 
                  checked={true} 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-photos" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Include photo upload option
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="offer-discount" 
                  checked={true} 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="offer-discount" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Include discount offer for next trip
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackEmailSystem;