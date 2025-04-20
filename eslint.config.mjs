export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: ["next"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];
