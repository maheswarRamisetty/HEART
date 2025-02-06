import { useState } from 'react';
import { motion } from 'framer-motion';
import HeartBackground from '../components/HeartBackground';
import heartBg from '../assets/a11.png';
import toast from 'react-hot-toast';
import { FaHeartbeat, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function ImageAnalysis() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    bloodSugar: '',
    bloodPressure: '',
    cholesterol: '',
    maxHeartRate: '',
    chestPainType: '',
    ecgResults: ''
  });

  const [results, setResults] = useState(null);

  const ageOptions = Array.from({ length: 91 }, (_, i) => i + 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      bloodSugar: '',
      bloodPressure: '',
      cholesterol: '',
      maxHeartRate: '',
      chestPainType: '',
      ecgResults: ''
    });
    setResults(null);
  };

  const analyzeECGRisk = (ecgValue) => {
    const ecgNum = parseInt(ecgValue);
    if (ecgNum === 0) {
      return {
        level: "Normal",
        riskPercentage: "10-15%",
        checkupFrequency: "Annual",
        urgency: "Routine",
        description: "Your ECG shows normal sinus rhythm",
        recommendations: [
          "Continue regular health check-ups",
          "Maintain healthy lifestyle habits",
          "Exercise regularly",
          "Follow a heart-healthy diet"
        ]
      };
    } else if (ecgNum === 1) {
      return {
        level: "Moderate Risk",
        riskPercentage: "30-45%",
        checkupFrequency: "Every 6 months",
        urgency: "Soon",
        description: "ECG shows ST-T wave abnormality",
        recommendations: [
          "Schedule follow-up with cardiologist",
          "Monitor blood pressure regularly",
          "Consider stress test",
          "Review and adjust medications if prescribed",
          "Implement lifestyle modifications"
        ]
      };
    } else {
      return {
        level: "High Risk",
        riskPercentage: "60-75%",
        checkupFrequency: "Monthly",
        urgency: "Immediate",
        description: "ECG shows definite left ventricular hypertrophy",
        recommendations: [
          "Immediate consultation with cardiologist",
          "Further cardiac evaluation needed",
          "Regular monitoring of heart function",
          "Strict adherence to prescribed medications",
          "Lifestyle modifications essential",
          "Regular follow-up care"
        ]
      };
    }
  };

  const calculateOverallRisk = (data) => {
    const ecgRisk = analyzeECGRisk(data.ecgResults);
    const age = parseInt(data.age);
    const bp = parseInt(data.bloodPressure);
    const chol = parseInt(data.cholesterol);

    let riskFactors = 0;
    if (age > 55) riskFactors++;
    if (bp > 140) riskFactors++;
    if (chol > 200) riskFactors++;
    if (data.chestPainType > 1) riskFactors++;

    let overallRisk = { ...ecgRisk };
    if (riskFactors >= 3) {
      overallRisk.level = "High Risk";
      overallRisk.recommendations.push(
        "Comprehensive cardiovascular evaluation recommended",
        "Consider advanced cardiac imaging"
      );
    }

    return overallRisk;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const riskAnalysis = calculateOverallRisk(formData);
    setResults(riskAnalysis);
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "High Risk":
        return <FaExclamationTriangle className="text-4xl text-red-600" />;
      case "Moderate Risk":
        return <FaChartLine className="text-4xl text-yellow-600" />;
      case "Normal":
        return <FaCheckCircle className="text-4xl text-green-600" />;
      default:
        return <FaHeartbeat className="text-4xl text-blue-600" />;
    }
  };

  const getRiskColors = (level) => {
    switch (level) {
      case "High Risk":
        return "from-red-500/20 to-red-600/20 border-red-400";
      case "Moderate Risk":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-400";
      case "Normal":
        return "from-green-500/20 to-green-600/20 border-green-400";
      default:
        return "from-blue-500/20 to-blue-600/20 border-blue-400";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative bg-gradient-to-br from-gray-600 to-gray-600">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${heartBg})`,
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(0.5px)'
        }}
      />
      <HeartBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <motion.svg
            className="w-32 h-32 mx-auto mb-6"
            viewBox="0 0 24 24"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#8B0000"
              stroke="#8B0000"
              strokeWidth="1"
              animate={{
                scale: [1, 1.1, 1],
                fill: ['#8B0000', '#660000', '#8B0000']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="11"
              stroke="#8B0000"
              strokeWidth="0.5"
              fill="none"
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M2 12 L8 12 L10 8 L12 16 L14 12 L20 12"
              fill="none"
              stroke="#8B0000"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.svg>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            ECG-Based Heart Risk Assessment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 drop-shadow-md"
          >
            Advanced cardiovascular analysis using ECG and clinical data
          </motion.p>
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Age:</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                >
                  <option value="">Select Age</option>
                  {ageOptions.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </motion.div>
    
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Gender:</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Blood Sugar Level:</label>
                <select
                  name="bloodSugar"
                  value={formData.bloodSugar}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                >
                  <option value="">Select Blood Sugar Level</option>
                  <option value="normal">Normal (70-99 mg/dL)</option>
                  <option value="prediabetes">Prediabetes (100-125 mg/dL)</option>
                  <option value="diabetes">Diabetes (126+ mg/dL)</option>
                  <option value="high">High (180-250 mg/dL)</option>
                  <option value="very-high">Very High (250+ mg/dL)</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Blood Pressure (94-200):</label>
                <input
                  type="number"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Cholesterol (126-564):</label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-white text-sm font-medium mb-2">ECG Results (0-2):</label>
                <select
                  name="ecgResults"
                  value={formData.ecgResults}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                >
                  <option value="">Select ECG Result</option>
                  <option value="0">Normal (0)</option>
                  <option value="1">ST-T Wave Abnormality (1)</option>
                  <option value="2">Left Ventricular Hypertrophy (2)</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Chest Pain Type (0-3):</label>
                <select
                  name="chestPainType"
                  value={formData.chestPainType}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                >
                  <option value="">Select Chest Pain Type</option>
                  <option value="0">Typical Angina (0)</option>
                  <option value="1">Atypical Angina (1)</option>
                  <option value="2">Non-Anginal Pain (2)</option>
                  <option value="3">Asymptomatic (3)</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-white text-sm font-medium mb-2">Max Heart Rate (71-202):</label>
                <input
                  type="number"
                  name="maxHeartRate"
                  value={formData.maxHeartRate}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-400"
                  required
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center gap-6"
          >
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Analyze Risk
            </button>
          </motion.div>
        </motion.form>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              {getRiskIcon(results.level)}
              <div>
                <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
                <p className="text-gray-300">Based on your provided health metrics</p>
              </div>
            </div>

            <div className={`p-6 rounded-xl mb-6 bg-gradient-to-r ${getRiskColors(results.level)} backdrop-blur-md border`}>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Risk Level</h3>
                  <p className="text-2xl font-bold text-white">{results.level}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Risk Range</h3>
                  <p className="text-2xl font-bold text-white">{results.riskPercentage}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Check-up</h3>
                  <p className="text-2xl font-bold text-white">{results.checkupFrequency}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Urgency</h3>
                  <p className="text-2xl font-bold text-white">{results.urgency}</p>
                </div>
              </div>
              <p className="text-lg text-white/90">{results.description}</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recommendations:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {results.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10"
                  >
                    <span className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </span>
                    <p className="text-white/90">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ImageAnalysis;