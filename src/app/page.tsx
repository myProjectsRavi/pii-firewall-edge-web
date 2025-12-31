"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("javascript");
  const [demoInput, setDemoInput] = useState("My email is john.doe@company.com and SSN is 123-45-6789. Call me at 555-123-4567.");
  const [demoOutput, setDemoOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const codeExamples: Record<string, { code: string; lang: string }> = {
    javascript: {
      lang: "JavaScript",
      code: `const response = await fetch(
  'https://pii-firewall-edge.p.rapidapi.com/v1/redact/fast',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'YOUR_API_KEY'
    },
    body: JSON.stringify({
      text: 'Email: john@company.com, SSN: 123-45-6789'
    })
  }
);

const { redacted, detections } = await response.json();`
    },
    python: {
      lang: "Python",
      code: `import requests

response = requests.post(
    'https://pii-firewall-edge.p.rapidapi.com/v1/redact/fast',
    headers={
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'YOUR_API_KEY'
    },
    json={'text': 'Email: john@company.com, SSN: 123-45-6789'}
)

data = response.json()
print(data['redacted'])`
    },
    java: {
      lang: "Java",
      code: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://pii-firewall-edge.p.rapidapi.com/v1/redact/fast"))
    .header("Content-Type", "application/json")
    .header("X-RapidAPI-Key", "YOUR_API_KEY")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"text\\":\\"Email: john@company.com, SSN: 123-45-6789\\"}"
    ))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());`
    },
    curl: {
      lang: "cURL",
      code: `curl -X POST "https://pii-firewall-edge.p.rapidapi.com/v1/redact/fast" \\
  -H "Content-Type: application/json" \\
  -H "X-RapidAPI-Key: YOUR_API_KEY" \\
  -d '{"text": "Email: john@company.com, SSN: 123-45-6789"}'`
    }
  };

  const simulateRedaction = () => {
    setIsLoading(true);
    setTimeout(() => {
      const output = demoInput
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL]")
        .replace(/\d{3}-\d{2}-\d{4}/g, "[SSN]")
        .replace(/\d{3}-\d{3}-\d{4}/g, "[PHONE_US]")
        .replace(/\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g, "[CREDIT_CARD]");
      setDemoOutput(output);
      setIsLoading(false);
    }, 300);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">PII Firewall Edge</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#demo" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Live Demo</a>
              <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</a>
              <a href="#integrate" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Integrate</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
              <a href="https://rapidapi.com/image-zero-trust-security-labs/api/pii-firewall-edge" 
                 target="_blank" 
                 className="bg-emerald-500 hover:bg-emerald-400 px-5 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                Get API Key
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-slate-300 text-sm">v2.4.0 — 152 PII Types Across 50+ Countries</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            Enterprise PII Detection<br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Zero AI. Zero Logs.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Redact sensitive data before sending to LLMs. 5ms latency. 
            Deterministic algorithms. Your data never trains external models.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#demo"
               className="bg-emerald-500 hover:bg-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-emerald-500/25 inline-flex items-center justify-center gap-2">
              Try Live Demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a href="https://rapidapi.com/image-zero-trust-security-labs/api/pii-firewall-edge" 
               target="_blank"
               className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2">
              Get Free API Key
            </a>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: "🔒", label: "GDPR Compliant" },
              { icon: "🛡️", label: "CCPA Ready" },
              { icon: "⚡", label: "5ms Latency" },
              { icon: "🌍", label: "50+ Countries" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-800/30 backdrop-blur border border-slate-700/30 rounded-lg px-4 py-2">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
            <p className="text-slate-400 text-lg">See PII detection in action — no signup required</p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Input Text (paste any text with PII)</label>
              <textarea
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                placeholder="Enter text containing emails, SSNs, phone numbers, credit cards..."
              />
            </div>
            
            <button
              onClick={simulateRedaction}
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:opacity-50 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Redact PII
                </>
              )}
            </button>
            
            {demoOutput && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Redacted Output</label>
                <div className="bg-slate-800 border border-emerald-500/30 rounded-xl p-4 font-mono text-sm">
                  <span className="text-emerald-400">{demoOutput}</span>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-4">
            * This demo runs locally in your browser. The API processes 152 PII types.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "152", label: "PII Types", icon: "🔍" },
              { value: "<5ms", label: "Latency", icon: "⚡" },
              { value: "30+", label: "Validators", icon: "✓" },
              { value: "99.9%", label: "Uptime", icon: "📊" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl mb-2">{stat.icon}</span>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Zero AI Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Zero AI Matters</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AI-based detection sends your data elsewhere. We use math.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-red-400 font-semibold text-lg">AI-Based Tools</span>
              </div>
              <ul className="space-y-4">
                {["Data sent to ML model servers", "May be logged for training", "Third-party data processing", "Non-deterministic results"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-emerald-400 font-semibold text-lg">PII Firewall Edge</span>
              </div>
              <ul className="space-y-4">
                {["Cloudflare Edge (300+ locations)", "Zero logging, zero storage", "Data stays in your region", "Deterministic: same input = same output"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Detect</h2>
            <p className="text-slate-400 text-lg">152 PII types with checksum validation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: "📧", title: "Contact Info", items: ["Email addresses", "Phone (US/UK/IN)", "Social handles"] },
              { icon: "🪪", title: "Government IDs", items: ["SSN, Passport", "Driver's License", "Tax IDs (global)"] },
              { icon: "💳", title: "Financial", items: ["Credit Cards", "IBAN, SWIFT", "Crypto addresses"] },
              { icon: "🏥", title: "Healthcare", items: ["NPI, DEA", "Medicare IDs", "Medical Records"] },
              { icon: "🔑", title: "API Secrets", items: ["AWS, GitHub", "Stripe, OpenAI", "Slack tokens"] },
              { icon: "🌍", title: "Global IDs", items: ["China, Japan, Korea", "Brazil, Mexico", "EU member states"] },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 hover:bg-slate-800/50 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <ul className="space-y-1 text-slate-400 text-sm">
                  {feature.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integrate" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrate in Minutes</h2>
            <p className="text-slate-400 text-lg">Copy, paste, ship. No SDK required.</p>
          </div>
          
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/50">
              <div className="flex">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-6 py-3 text-sm font-medium transition-all relative ${
                      activeTab === lang
                        ? "text-emerald-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {codeExamples[lang].lang}
                    {activeTab === lang && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={copyCode}
                className="px-4 py-2 mr-2 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
              <code className="text-slate-300 font-mono">{codeExamples[activeTab].code}</code>
            </pre>
          </div>
          
          <div className="mt-6 text-center">
            <a href="https://github.com/myProjectsRavi/pii-firewall-edge-api-examples" 
               target="_blank"
               className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors">
              View Full Examples on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-400 text-lg">Start free. Scale as you grow.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { name: "Basic", price: "$0", requests: "500", highlight: false, badge: null },
              { name: "Pro", price: "$5", requests: "5,000", highlight: false, badge: null },
              { name: "Ultra", price: "$10", requests: "20,000", highlight: false, badge: null },
              { name: "Mega", price: "$25", requests: "75,000", highlight: true, badge: "Best Value" },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 relative ${
                plan.highlight 
                  ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 shadow-xl shadow-emerald-500/20' 
                  : 'bg-slate-800/50 border border-slate-700/50'
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className="text-lg font-medium mb-1">{plan.name}</div>
                <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal opacity-70">/mo</span></div>
                <div className="text-sm opacity-80 mb-6">{plan.requests} requests/month</div>
                <ul className="space-y-2 text-sm mb-6 opacity-90">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All 152 PII types
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {plan.name === "Basic" ? "20KB" : "100KB"}/request
                  </li>
                </ul>
                <a href="https://rapidapi.com/image-zero-trust-security-labs/api/pii-firewall-edge" 
                   target="_blank"
                   className={`block text-center py-2.5 rounded-lg font-medium transition-all ${
                     plan.highlight 
                       ? 'bg-white text-emerald-700 hover:bg-emerald-50' 
                       : 'bg-slate-700 hover:bg-slate-600'
                   }`}>
                  {plan.name === "Basic" ? "Start Free" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              97% less than AWS Comprehend ($250+/mo) or Google DLP ($200+/mo)
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Protecting User Data Today</h2>
          <p className="text-slate-400 text-lg mb-8">Free tier includes 500 requests/month. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://rapidapi.com/image-zero-trust-security-labs/api/pii-firewall-edge" 
               target="_blank"
               className="bg-emerald-500 hover:bg-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-emerald-500/25">
              Get Free API Key
            </a>
            <a href="mailto:piifirewalledge@gmail.com?subject=PII%20Firewall%20Edge%20Inquiry" 
               className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-semibold">PII Firewall Edge</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Enterprise-grade PII detection. Zero AI. Zero Logs. Trusted by developers worldwide.</p>
              <a href="https://fazier.com/launches/pii-firewall-edge-web.vercel.app" target="_blank" className="inline-block mt-4">
                <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark" width={120} alt="Fazier Launched badge" />
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Product</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="https://rapidapi.com/image-zero-trust-security-labs/api/pii-firewall-edge" target="_blank" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Developers</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#integrate" className="hover:text-white transition-colors">Quick Start</a></li>
                <li><a href="https://github.com/myProjectsRavi/pii-firewall-edge-api-examples" target="_blank" className="hover:text-white transition-colors">SDK Examples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Support</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="mailto:piifirewalledge@gmail.com" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="mailto:piifirewalledge@gmail.com?subject=Feedback" className="hover:text-white transition-colors">Send Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800/50 pt-8 text-center text-slate-600 text-sm">
            <p>© 2025 PII Firewall Edge. Built with security in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
