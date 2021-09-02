export const GA_TRACKING_ID = "G-HBPW1ZV4QN";

export const pageview = (url) => {
  //@ts-ignore
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  //@ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
