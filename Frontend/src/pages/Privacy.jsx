import React from "react";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-slate-100">
      <div className="text-center max-w-5xl w-full bg-white p-6 shadow-lg rounded-3xl">
        <h1 className="text-4xl font-bold mt-6 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your privacy is important to us at Inkwise. This privacy policy explains how we collect, use, and share information from our users.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-lg text-gray-600 mb-4">
          When you use Inkwise, we collect the information you provide directly to us, such as when you create an account, enter data on the whiteboard, or contact our support team. This may include:
        </p>
        <ul className="list-disc list-inside text-left text-lg text-gray-600 mb-6 mx-auto max-w-3xl">
          <li className="mb-3"> <b>Account Information:</b> Name, email address, and login credentials.</li>
          <li className="mb-3"> <b>Whiteboard Content:</b> Any notes, drawings, or other content entered on the whiteboard.</li>
          <li className="mb-3"> <b>Device Information:</b> Data about the device you use to access our services, including hardware model and operating system.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-lg text-gray-600 mb-6">
          The information we collect is used to improve and personalize your experience with Inkwise. This includes providing you with better services, customer support, and updates about our products.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">3. Data Sharing and Third Parties</h2>
        <p className="text-lg text-gray-600 mb-4">
          Inkwise integrates with third-party services like Gemini AI for enhanced whiteboard functionalities. Please note:
        </p>
        <ul className="list-disc list-inside text-left text-lg text-gray-600 mb-6 mx-auto max-w-3xl">
          <li className="mb-3">
            <b>Data Entered into the Whiteboard:</b> Any content (text, drawings, images, etc.) entered into the whiteboard may be transmitted to and processed by Gemini AI. This data is sent to Gemini AI to provide features such as idea generation, diagramming, and real-time collaboration.
          </li>
          <li className="mb-3">
            <b>No Control Over Third-Party Data Handling:</b> Inkwise has no control over how Gemini AI stores, uses, or processes the data transmitted to it. We recommend reviewing the privacy policy of Gemini AI for more details on their data handling practices.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="text-lg text-gray-600 mb-6">
          We take data security seriously and use industry-standard practices to protect your information. However, no system is entirely secure, and we cannot guarantee the security of your information.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">5. Your Choices</h2>
        <p className="text-lg text-gray-600 mb-6">
          You have the right to access, modify, or delete your personal information at any time. You can manage your account settings by logging into Inkwise or by contacting our support team for assistance.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
        <p className="text-lg text-gray-600 mb-6">
          We may update this privacy policy from time to time to reflect changes in our practices or relevant laws. If we make significant changes, we will notify you through our services or by other means, such as email.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          If you have any questions or concerns about this privacy policy, please contact us at privacy@inkwise.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
