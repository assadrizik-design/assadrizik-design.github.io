import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-8 md:p-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed text-sm">
        <p><strong>Last Updated:</strong> April 2026</p>

        <h2 className="text-xl font-semibold text-blue-300 mt-6">1. Introduction</h2>
        <p>
          Welcome to ChromaFall. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle data when you visit our website and play our game.
        </p>

        <h2 className="text-xl font-semibold text-blue-300 mt-6">2. Data We Collect</h2>
        <p>
          ChromaFall is designed to be a lightweight web application. We <strong>do not</strong> require you to create an account, nor do we actively collect personally identifiable information (PII) such as your name, address, or phone number simply by playing.
          <br/><br/>
          However, our website uses <strong>Google AdSense</strong> to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.
        </p>

        <h2 className="text-xl font-semibold text-blue-300 mt-6">3. Cookies and Advertising (Google AdSense)</h2>
        <p>
          Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
          Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
          <br/><br/>
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Ads Settings</a>.
        </p>

        <h2 className="text-xl font-semibold text-blue-300 mt-6">4. Third-Party Links</h2>
        <p>
          Our application may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices of such other sites.
        </p>

        <h2 className="text-xl font-semibold text-blue-300 mt-6">5. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </div>
  );
}
