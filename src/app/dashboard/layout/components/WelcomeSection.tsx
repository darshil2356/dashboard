



import UniversalDatePicker from "../../../components/UniversalDatePicker";

const WelcomeSection = ({ user, onDateChange }) => (
  <div className="bg-white p-6 rounded-lg mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Here’s what’s happening with your projects today.
        </p>
      </div>

      <UniversalDatePicker
        onChange={onDateChange}
        placeholder="Select Dates"
        calendarPosition="right"
      />
    </div>
  </div>
);
export default WelcomeSection;