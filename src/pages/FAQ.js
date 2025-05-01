import React from 'react';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Navigate to the Appointment page, select a doctor, choose a time slot, and proceed with payment.',
  },
  {
    question: 'Can I reschedule my appointment?',
    answer:
      'Yes, you can reschedule your appointment from your dashboard at least 24 hours in advance.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, UPI, and net banking.',
  },
  {
    question: 'Is my medical information safe?',
    answer:
      'Yes, we use advanced encryption and follow all HIPAA guidelines to secure your data.',
  },
  {
    question: 'Can I cancel my appointment?',
    answer:
      'Yes, you can cancel your appointment up to 12 hours before your scheduled time.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'You can reach our support team via the "Contact Us" page or call our toll-free number 1800-123-456.',
  },
];

const FAQ = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
