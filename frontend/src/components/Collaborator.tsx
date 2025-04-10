"use client"

import type React from "react"

import { useState } from "react"
import {
  Users,
  UserPlus,
  Mail,
  Copy,
  Check,
  Clock,
  MessageSquare,
  Settings,
  Shield,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  X,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Calendar,
  MapPin,
  Briefcase,
  Utensils,
  Plus,
} from "lucide-react"

type Collaborator = {
  id: string
  name: string
  email: string
  avatar: string
  role: "owner" | "editor" | "viewer"
  lastActive: string
}

type ActivityItem = {
  id: string
  userId: string
  userName: string
  userAvatar: string
  action: string
  target: string
  timestamp: string
}

export const CollaboratePage = ({ isDarkMode = false }) => {
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("editor")
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [selectedTab, setSelectedTab] = useState("collaborators")
  const [showPermissionsDropdown, setShowPermissionsDropdown] = useState("")

  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "You",
      email: "you@example.com",
      avatar: "/placeholder.svg",
      role: "owner",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg",
      role: "editor",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.c@example.com",
      avatar: "/placeholder.svg",
      role: "viewer",
      lastActive: "Yesterday",
    },
  ]

  const activityHistory: ActivityItem[] = [
    {
      id: "1",
      userId: "2",
      userName: "Sarah Johnson",
      userAvatar: "/placeholder.svg",
      action: "added",
      target: "Paragliding in Solang Valley to Day 2 itinerary",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      userId: "1",
      userName: "You",
      userAvatar: "/placeholder.svg",
      action: "updated",
      target: "accommodation details for Hotel Mountain View",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      userId: "3",
      userName: "Mike Chen",
      userAvatar: "/placeholder.svg",
      action: "commented on",
      target: "Day 3 itinerary",
      timestamp: "2 days ago",
    },
    {
      id: "4",
      userId: "2",
      userName: "Sarah Johnson",
      userAvatar: "/placeholder.svg",
      action: "added",
      target: "Hadimba Temple to places to visit",
      timestamp: "3 days ago",
    },
    {
      id: "5",
      userId: "1",
      userName: "You",
      userAvatar: "/placeholder.svg",
      action: "created",
      target: "the Manali trip plan",
      timestamp: "1 week ago",
    },
  ]

  const pendingTasks = [
    {
      id: "1",
      title: "Book hotel in Manali",
      assignee: "You",
      dueDate: "Apr 15, 2025",
      category: "Accommodation",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "Research local restaurants",
      assignee: "Sarah Johnson",
      dueDate: "Apr 12, 2025",
      category: "Food",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Arrange transportation to Solang Valley",
      assignee: "Mike Chen",
      dueDate: "Apr 18, 2025",
      category: "Transportation",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Update packing list for mountain weather",
      assignee: "Unassigned",
      dueDate: "Apr 20, 2025",
      category: "Packing",
      icon: <Briefcase className="h-4 w-4" />,
    },
  ]

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://packuppal.com/trips/manali-2025/invite")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle invitation logic here
    setInviteEmail("")
    setShowInviteForm(false)
  }

  const renderCollaborators = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Collaborators ({collaborators.length})
            </h2>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Invite friends and family to plan this trip together
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Invite People</span>
            </button>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              }`}
            >
              {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{linkCopied ? "Copied!" : "Copy Invite Link"}</span>
            </button>
          </div>
        </div>

        {showInviteForm && (
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Invite Collaborators</h3>
              <button
                onClick={() => setShowInviteForm(false)}
                className={`p-1 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <X className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </button>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email address
                </label>
                <div className="flex gap-2">
                  <div
                    className={`flex-1 flex items-center px-3 py-2 rounded-lg ${
                      isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-300"
                    }`}
                  >
                    <Mail className={`h-5 w-5 mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className={`flex-1 bg-transparent border-none outline-none ${
                        isDarkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
                      }`}
                    />
                  </div>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className={`px-3 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border border-gray-600 text-gray-200"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="editor">Can edit</option>
                    <option value="viewer">Can view</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className={`p-4 rounded-lg flex items-center justify-between ${
                isDarkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={collaborator.avatar || "/placeholder.svg"}
                    alt={collaborator.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                      isDarkMode ? "border-gray-800" : "border-white"
                    } ${
                      collaborator.lastActive === "Just now"
                        ? "bg-green-500"
                        : collaborator.lastActive.includes("hour")
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {collaborator.name}
                    </p>
                    {collaborator.role === "owner" && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Owner
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {collaborator.email} • {collaborator.lastActive}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {collaborator.id !== "1" && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowPermissionsDropdown(showPermissionsDropdown === collaborator.id ? "" : collaborator.id)
                      }
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
                          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {collaborator.role === "editor" ? (
                        <Edit className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                      <span className="text-sm">{collaborator.role === "editor" ? "Can edit" : "Can view"}</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {showPermissionsDropdown === collaborator.id && (
                      <div
                        className={`absolute right-0 mt-1 w-48 rounded-lg shadow-lg z-10 ${
                          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="py-1">
                          <button
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 ${
                              isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-50 text-gray-700"
                            } ${collaborator.role === "editor" ? "font-medium" : ""}`}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Can edit</span>
                            {collaborator.role === "editor" && <Check className="h-4 w-4 ml-auto" />}
                          </button>
                          <button
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 ${
                              isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-50 text-gray-700"
                            } ${collaborator.role === "viewer" ? "font-medium" : ""}`}
                          >
                            <Eye className="h-4 w-4" />
                            <span>Can view</span>
                            {collaborator.role === "viewer" && <Check className="h-4 w-4 ml-auto" />}
                          </button>
                          <div className={`my-1 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}></div>
                          <button
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 ${
                              isDarkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-50 text-red-600"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {collaborator.id === "1" && (
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      isDarkMode ? "bg-gray-700 text-gray-300 border border-gray-600" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    You
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"}`}
            >
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`font-medium mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Access & Permissions
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Control who can view or edit your travel plans. You can change permissions anytime.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Manage Permissions</span>
                </button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  }`}
                >
                  <EyeOff className="h-4 w-4" />
                  <span>Make Private</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderActivity = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Activity</h2>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            See what's happening with your travel plan
          </p>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <h3 className={`font-medium mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Recent Activity</h3>
          <div className="space-y-4">
            {activityHistory.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <img
                  src={activity.userAvatar || "/placeholder.svg"}
                  alt={activity.userName}
                  className="w-8 h-8 rounded-full object-cover mt-0.5"
                />
                <div className="flex-1">
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    <span className="font-medium">{activity.userName}</span>{" "}
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                      {activity.action} {activity.target}
                    </span>
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`mt-4 w-full py-2 rounded-lg text-sm ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            View All Activity
          </button>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <h3 className={`font-medium mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Pending Tasks</h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      task.category === "Accommodation"
                        ? isDarkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                        : task.category === "Food"
                          ? isDarkMode
                            ? "bg-green-500/20 text-green-400"
                            : "bg-green-100 text-green-600"
                          : task.category === "Transportation"
                            ? isDarkMode
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-amber-100 text-amber-600"
                            : isDarkMode
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {task.icon}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>{task.title}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Assigned to: {task.assignee}
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>•</span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className={`p-1.5 rounded-full ${
                    isDarkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            className={`mt-4 w-full py-2 rounded-lg text-sm flex items-center justify-center gap-1 ${
              isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Task</span>
          </button>
        </div>
      </div>
    )
  }

  const renderComments = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Comments & Discussion</h2>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Discuss your travel plans with collaborators
          </p>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Comments</h3>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Recent</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <img src="/placeholder.svg" alt="Mike Chen" className="w-8 h-8 rounded-full object-cover mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Mike Chen</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>2 days ago</p>
                  </div>
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    I think we should consider visiting Rohtang Pass early in the morning to avoid crowds. The views are
                    spectacular at sunrise!
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className={`text-xs flex items-center gap-1 ${
                        isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </button>
                    <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>•</span>
                    <button
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      2 replies
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <img src="/placeholder.svg" alt="Sarah Johnson" className="w-8 h-8 rounded-full object-cover mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Sarah Johnson</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>3 days ago</p>
                  </div>
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    I've added Hadimba Temple to our list of places to visit. It's a beautiful ancient temple with
                    amazing architecture. We should definitely check it out!
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className={`text-xs flex items-center gap-1 ${
                        isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </button>
                    <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>•</span>
                    <button
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      1 reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div
              className={`flex items-start gap-3 p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200"
              }`}
            >
              <img src="/placeholder.svg" alt="You" className="w-8 h-8 rounded-full object-cover mt-0.5" />
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment..."
                  rows={3}
                  className={`w-full p-2 rounded-lg resize-none ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-600"
              }`}
            >
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`font-medium mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Comment Notifications
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                You'll receive notifications when someone comments on your travel plan. You can adjust your notification
                settings anytime.
              </p>
              <div className="mt-3">
                <button
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Notification Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Collaborate on Manali Trip</h1>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Work together with friends and family to plan your perfect trip
          </p>
        </div>

        <div className="mb-6">
          <div className={`flex flex-wrap gap-2 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <button
              onClick={() => setSelectedTab("collaborators")}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === "collaborators"
                  ? isDarkMode
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-blue-600 border-b-2 border-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Collaborators</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedTab("activity")}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === "activity"
                  ? isDarkMode
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-blue-600 border-b-2 border-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Activity</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedTab("comments")}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === "comments"
                  ? isDarkMode
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-blue-600 border-b-2 border-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </div>
            </button>
          </div>
        </div>

        {selectedTab === "collaborators" && renderCollaborators()}
        {selectedTab === "activity" && renderActivity()}
        {selectedTab === "comments" && renderComments()}
      </div>
    </div>
  )
}
