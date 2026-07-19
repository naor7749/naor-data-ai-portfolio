"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Locale } from "./content";

type PortfolioAgentProps = { locale: Locale };
type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const copy = {
  he: {
    toggle: "שאלו את Naor AI",
    title: "Naor AI",
    subtitle: "פרויקטים, יכולות ושיתופי פעולה",
    close: "סגירת הצ׳אט",
    greeting:
      "היי! אפשר לשאול אותי על הפרויקטים, היכולות והניסיון של נאור, או לתאר צורך מקצועי ולבדוק כיצד הוא עשוי לעזור.",
    placeholder: "כתבו שאלה או תארו את הפרויקט...",
    send: "שליחה",
    loading: "בודק את המידע...",
    error: "לא הצלחתי להשלים את הבקשה. אפשר לנסות שוב או לפנות ישירות לנאור.",
    hint: "Enter לשליחה · Shift+Enter לשורה חדשה",
    suggestions: [
      "איזה פרויקט הכי קשור ל-NLP?",
      "אני צריך דשבורד. נאור יכול לעזור?",
      "איך יוצרים קשר עם נאור?",
    ],
    email: "דוא״ל",
    linkedin: "LinkedIn",
  },
  en: {
    toggle: "Ask Naor AI",
    title: "Naor AI",
    subtitle: "Projects, capabilities, and collaboration",
    close: "Close chat",
    greeting:
      "Hi! Ask me about Naor's projects, skills, and experience, or describe a professional need to explore how he may be able to help.",
    placeholder: "Ask a question or describe your project...",
    send: "Send",
    loading: "Checking the portfolio...",
    error: "I could not complete the request. Please try again or contact Naor directly.",
    hint: "Enter to send · Shift+Enter for a new line",
    suggestions: [
      "Which project is most relevant to NLP?",
      "I need a dashboard. Could Naor help?",
      "How can I contact Naor?",
    ],
    email: "Email",
    linkedin: "LinkedIn",
  },
} as const;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function renderMessageText(text: string): ReactNode[] {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.split(urlPattern).map((part, index) => {
    if (!part.match(/^https?:\/\//)) return <span key={`${part}-${index}`}>{part}</span>;
    const cleanUrl = part.replace(/[),.;!?]+$/, "");
    const trailingText = part.slice(cleanUrl.length);
    return (
      <span key={`${part}-${index}`}>
        <a href={cleanUrl} target="_blank" rel="noreferrer">{cleanUrl}</a>
        {trailingText}
      </span>
    );
  });
}

export function PortfolioAgent({ locale }: PortfolioAgentProps) {
  const text = copy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: text.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  async function sendMessage(value?: string): Promise<void> {
    const content = (value ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: content.slice(0, 500),
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          message: userMessage.content,
          messages: nextMessages
            .filter((message) => message.id !== "welcome")
            .slice(-10)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });
      const data: unknown = await response.json();
      if (
        !response.ok ||
        typeof data !== "object" ||
        data === null ||
        !("reply" in data) ||
        typeof data.reply !== "string"
      ) {
        const serverMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : text.error;
        throw new Error(serverMessage);
      }
      const reply = data.reply;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId(),
          role: "assistant",
          content: reply,
        },
      ]);




    } catch (requestError) {
      console.error("Portfolio agent request failed:", requestError);
      setError(requestError instanceof Error ? requestError.message : text.error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="portfolio-agent" dir={locale === "he" ? "rtl" : "ltr"}>
      {isOpen ? (
        <section className="agent-panel" id="portfolio-agent-panel" role="dialog" aria-label={text.title}>
          <header className="agent-header">
            <div className="agent-identity">
              <span className="agent-status-dot" aria-hidden="true" />
              <div>
                <strong>{text.title}</strong>
                <span>{text.subtitle}</span>
              </div>
            </div>
            <button className="agent-close" type="button" onClick={() => setIsOpen(false)} aria-label={text.close}>×</button>
          </header>

          <div className="agent-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`agent-message agent-message-${message.role}`} key={message.id}>
                <div>{renderMessageText(message.content)}</div>
              </div>
            ))}
            {isLoading ? (
              <div className="agent-message agent-message-assistant">
                <div className="agent-loading">
                  <span>{text.loading}</span>
                  <span className="agent-loading-dots" aria-hidden="true"><i /><i /><i /></span>
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 ? (
            <div className="agent-suggestions">
              {text.suggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)} disabled={isLoading}>
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {error ? <p className="agent-error">{error}</p> : null}

          <form className="agent-form" onSubmit={handleSubmit}>
            <label className="agent-input-wrap">
              <span className="sr-only">{text.placeholder}</span>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={text.placeholder}
                maxLength={500}
                rows={2}
                disabled={isLoading}
              />
            </label>
            <button className="agent-send" type="submit" disabled={isLoading || input.trim().length === 0}>
              {text.send}<span aria-hidden="true">{locale === "he" ? "←" : "→"}</span>
            </button>
          </form>

          <div className="agent-footer">
            <span>{text.hint}</span>
            <div>
              <a href="mailto:naor7749@gmail.com">{text.email}</a>
              <a href="https://www.linkedin.com/in/naor-shem-tov-949bb9174/" target="_blank" rel="noreferrer">{text.linkedin}</a>
            </div>
          </div>
        </section>
      ) : null}

      <div className={`agent-launcher ${isOpen ? "is-open" : ""}`}>
        {!isOpen ? (
          <div className="agent-callout" aria-hidden="true">
            {locale === "he" ? "דברו איתי 👋" : "Ask me 👋"}
          </div>
        ) : null}

        {!isOpen ? (
          <div className="agent-mascot" aria-hidden="true">
            <div className="agent-mascot-antenna" />

            <div className="agent-mascot-head">
              <span className="agent-eye" />
              <span className="agent-eye" />
              <span className="agent-mouth" />
            </div>

            <div className="agent-mascot-arm">
              <span className="agent-mascot-finger" />
            </div>
          </div>
        ) : null}

        <button
          className="agent-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="portfolio-agent-panel"
        >
          <span className="agent-toggle-icon" aria-hidden="true">
            AI
          </span>

          <span>{text.toggle}</span>
        </button>
      </div>
    </div>
  );
}
