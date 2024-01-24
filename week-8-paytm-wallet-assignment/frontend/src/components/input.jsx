/* eslint-disable react/prop-types */
export const Input = ({ label, type, placeholder, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 mt-2 w-full">
      <label className="font-semibold">{label}</label>
      <input
        className="p-2 border rounded-lg"
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
