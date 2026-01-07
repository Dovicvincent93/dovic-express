import "./FAQs.css";
import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      q: "How do I track my shipment?",
      a: "You can track your shipment by entering your tracking number on the Track Shipment page. Real-time updates will show the current location, status, and delivery progress."
    },
    {
      q: "What shipping services does Dovic Express offer?",
      a: "We provide domestic and international express delivery, air and sea freight, customs clearance, warehousing, fulfillment, and enterprise logistics solutions."
    },
    {
      q: "Which countries does Dovic Express operate in?",
      a: "Dovic Express operates across major global regions including the Americas, Europe, Asia-Pacific, the Middle East, and Africa through our logistics network and international partners."
    },
    {
      q: "How long does international shipping take?",
      a: "Delivery timelines depend on destination, service type, and customs processing. Express shipments typically arrive within 3–7 business days."
    },
    {
      q: "Does Dovic Express provide shipment insurance?",
      a: "Yes. Shipment insurance is available to protect goods against loss or damage during transit. Coverage options can be selected when creating a shipment."
    },
    {
      q: "How do I file a claim for lost or damaged shipments?",
      a: "Claims can be submitted through our Claims & Insurance page. Supporting documents such as invoices and delivery receipts may be required."
    },
    {
      q: "Can businesses integrate with Dovic Express systems?",
      a: "Yes. We provide enterprise accounts, API integrations, and dedicated logistics solutions for businesses and e-commerce platforms."
    },
    {
      q: "What payment methods are accepted?",
      a: "We support secure digital payments depending on your region and service type. Enterprise customers may qualify for invoicing and credit terms."
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via the Contact Us page, email, or customer service hotline. Support is available Monday to Saturday, 8am–6pm."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-page">
      {/* HERO */}
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about shipping, tracking,
          delivery services, and logistics solutions.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="faq-container">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? "open" : ""}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="faq-question">
              <h4>{item.q}</h4>
              <span>{openIndex === i ? "−" : "+"}</span>
            </div>

            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
