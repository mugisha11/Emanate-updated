import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      when: 'beforeChildren',
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 lg:p-12">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 lg:p-12 shadow-2xl overflow-hidden">
          <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
            Privacy Policy
          </motion.h1>
          <motion.p className="mt-4 text-white/90 max-w-3xl">
            We respect your privacy. This page explains what data we collect and how we use it. We keep things simple and transparent.
          </motion.p>
          <motion.div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium ring-1 ring-white/10">Data minimisation</span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium ring-1 ring-white/10">No tracking by default</span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium ring-1 ring-white/10">Server-side GenAI proxy</span>
          </motion.div>
        </div>
      </motion.header>

      <motion.main className="max-w-6xl mx-auto" variants={container} initial="hidden" animate="show">
        <motion.section variants={item} className="bg-white rounded-2xl p-6 lg:p-8 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">What we collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We only collect the information necessary to provide the service: contact details you provide when you join or contact us, and minimal analytics to keep the site healthy. We don’t sell your data.
          </p>
        </motion.section>

        <motion.section variants={item} className="bg-white rounded-2xl p-6 lg:p-8 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">How we use data</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To respond to contact messages and support requests.</li>
            <li>To send optional newsletters if you subscribe.</li>
            <li>To power server-side features such as the GenAI proxy without exposing API keys client-side.</li>
          </ul>
        </motion.section>

        <motion.section variants={item} className="bg-white rounded-2xl p-6 lg:p-8 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Cookies & analytics</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use lightweight analytics to understand general usage; no personal identifiers are stored. Cookies are only used for essential site functionality or when you opt in to features.
          </p>
          <div className="flex gap-3 flex-wrap">
            <motion.div whileHover={{ scale: 1.03 }} className="flex-1 min-w-[220px] bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg border">
              <h3 className="font-medium">Essential cookies</h3>
              <p className="text-sm text-gray-600">Required for site navigation and security.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="flex-1 min-w-[220px] bg-gradient-to-br from-yellow-50 to-white p-4 rounded-lg border">
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-gray-600">Aggregated, non-identifying metrics to improve the site.</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={item} className="bg-white rounded-2xl p-6 lg:p-8 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Your rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You can request access to or deletion of your data. Contact us at <a className="text-blue-600 underline" href="mailto:info@evidencesmatter.org">info@evidencesmatter.org</a> to exercise your rights.
          </p>
        </motion.section>

        <motion.section variants={item} className="bg-white rounded-2xl p-6 lg:p-8 mb-12 shadow">
          <h2 className="text-xl font-semibold mb-2">Design & security highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <motion.div whileHover={{ y: -6 }} className="p-4 bg-gradient-to-br from-white to-indigo-50 rounded-lg border shadow-sm">
              <h4 className="font-semibold">Server side keys</h4>
              <p className="text-sm text-gray-600">All API keys are stored on the server and never shipped to the browser.</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="p-4 bg-gradient-to-br from-white to-emerald-50 rounded-lg border shadow-sm">
              <h4 className="font-semibold">Minimal retention</h4>
              <p className="text-sm text-gray-600">We keep personal data only as long as necessary.</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="p-4 bg-gradient-to-br from-white to-rose-50 rounded-lg border shadow-sm">
              <h4 className="font-semibold">Encryption in transit</h4>
              <p className="text-sm text-gray-600">We recommend and support HTTPS for all deployments.</p>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default PrivacyPage;
