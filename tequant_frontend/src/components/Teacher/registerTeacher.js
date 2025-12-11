import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Phone, Lock, BookOpen } from 'lucide-react';

/**
 * Functional component for registering a new teacher.
 * This form collects essential information for creating a teacher profile.
 */
const RegisterTeacher = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    subjectArea: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // New state for dynamically loaded subject options
  const [dynamicSubjectOptions, setDynamicSubjectOptions] = useState([]);
  const [isSubjectsLoading, setIsSubjectsLoading] = useState(true);
  const [subjectLoadError, setSubjectLoadError] = useState(null);


  // --- EFFECT: Load Subject Options from API ---
  useEffect(() => {
    const fetchSubjects = async () => {
      // Simulate network delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // In a real application, replace this with your actual fetch call:
        /*
        const response = await fetch('https://api.tequant.ng/api/subjects/list');
        if (!response.ok) throw new Error("Failed to fetch subjects.");
        const data = await response.json();
        setDynamicSubjectOptions(data.subjects);
        */
        
        // Simulated successful data response
        const data = [
          'Financial Modeling',
          'Algorithmic Trading',
          'Data Science & Python',
          'Quantitative Finance',
          'Economics',
          'Risk Management',
          'Advanced Python'
        ];
        
        setDynamicSubjectOptions(data);
        setSubjectLoadError(null);
        
      } catch (error) {
        setSubjectLoadError("Could not load subject areas. Please check API connection.");
        console.error("Subject fetch error:", error);
      } finally {
        setIsSubjectsLoading(false);
      }
    };
    
    fetchSubjects();
  }, []); // Empty dependency array means this runs once on mount


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Error: Passwords do not match.');
      return;
    }
    
    // Simple validation placeholder
    if (!formData.email || !formData.password || !formData.firstName) {
      setMessage('Error: Please fill in required fields (First Name, Email, Password).');
      return;
    }

    setLoading(true);
    
    // --- Placeholder for API Call to LmsApi Backend ---
    console.log("Attempting to register teacher:", formData);
    
    try {
      // In a real application, you would send a POST request here:
      /*
      const response = await fetch('https://api.tequant.ng/api/teachers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization header for admin user if necessary
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Registration failed on the server.');
      }
      
      const result = await response.json();
      */
      
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage(`Success! Teacher ${formData.firstName} registered.`);
      setFormData({ // Clear form
        firstName: '', lastName: '', email: '', phone: '', 
        password: '', confirmPassword: '', subjectArea: '',
      });

      if (onRegistrationSuccess) {
        onRegistrationSuccess(); // Optional callback
      }

    } catch (error) {
      setMessage(`Registration failed: ${error.message || 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ name, type = 'text', label, icon: Icon, required = false, isSelect = false, options = [] }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        {isSelect ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 bg-white rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            disabled={isSubjectsLoading}
          >
            <option value="">
                {isSubjectsLoading ? 'Loading Subjects...' : 'Select Subject Area'}
            </option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            placeholder={label}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-indigo-600 mr-3" />
          Register New Teacher
        </h2>
        <p className="text-center text-gray-500 mb-8">
            Create an account for a new educator on the TE Quant LMS platform.
        </p>

        {message && (
          <div 
            className={`p-3 mb-6 rounded-lg ${message.startsWith('Error') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Display subject loading error if applicable */}
        {subjectLoadError && (
            <div className="p-3 mb-6 rounded-lg bg-red-100 text-red-700 border border-red-300" role="alert">
                {subjectLoadError}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField 
              name="firstName" 
              label="First Name" 
              icon={UserPlus} 
              required 
            />
            <InputField 
              name="lastName" 
              label="Last Name" 
              icon={UserPlus} 
              required 
            />
          </div>

          <InputField 
            name="email" 
            type="email" 
            label="Email Address" 
            icon={Mail} 
            required 
          />
          
          <InputField 
            name="phone" 
            type="tel" 
            label="Phone Number (Optional)" 
            icon={Phone} 
          />

          <InputField 
            name="subjectArea" 
            label="Main Subject Area" 
            icon={BookOpen} 
            isSelect 
            options={dynamicSubjectOptions} // Use dynamic options here
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField 
              name="password" 
              type="password" 
              label="Password" 
              icon={Lock} 
              required 
            />
            <InputField 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              icon={Lock} 
              required 
            />
          </div>

          <button
            type="submit"
            disabled={loading || isSubjectsLoading} // Disable registration if subjects are loading
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : isSubjectsLoading ? (
               'Loading form...'
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Register Teacher Account
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacher;