"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hola! soy tu Asistente Zoom Virtual. Como te puedo ayudar el día de hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Nice I found your chat history!\nGood query as well:",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-svh bg-background">
      {/* Header */}
      <header className="border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-auto">
            <img src="/images/axa-colpatria-logo.png" alt="AXA COLPATRIA" className="h-full w-auto" />
          </div>
          <h1 className="ml-3 text-lg font-medium text-primary">Asistente Zoe</h1>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
                  }`}
                >
                  <p className="text-sm md:text-base">{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tus preguntas..."
              className="flex-1 border-border focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
          <div className="text-xs text-muted-foreground text-center mt-4">
            AXA COLPATRIA © {new Date().getFullYear()} | Asistente Zoe
          </div>
        </div>
      </div>
    </div>
  )
}
