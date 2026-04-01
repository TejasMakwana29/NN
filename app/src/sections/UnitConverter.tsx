import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, RotateCcw, Calculator } from 'lucide-react';

const units = [
  { value: 'kg', label: 'Kilograms (kg)', factor: 1 },
  { value: 'g', label: 'Grams (g)', factor: 0.001 },
  { value: 'mg', label: 'Milligrams (mg)', factor: 0.000001 },
  { value: 'lb', label: 'Pounds (lb)', factor: 0.453592 },
  { value: 'oz', label: 'Ounces (oz)', factor: 0.0283495 },
  { value: 'ton', label: 'Metric Tons', factor: 1000 }
];

export function UnitConverter() {
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState<number>(2.20462);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const value = parseFloat(inputValue) || 0;
    const fromFactor = units.find(u => u.value === fromUnit)?.factor || 1;
    const toFactor = units.find(u => u.value === toUnit)?.factor || 1;
    const kgValue = value * fromFactor;
    const convertedValue = kgValue / toFactor;

    let cancelled = false;
    const t = setTimeout(() => {
      if (!cancelled) {
        setResult(convertedValue);
        setIsConverting(false);
      }
    }, 300);
    const t0 = setTimeout(() => {
      if (!cancelled) setIsConverting(true);
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
      clearTimeout(t0);
    };
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setInputValue('1');
    setFromUnit('kg');
    setToUnit('lb');
  };

  const formatResult = (value: number) => {
    if (value === 0) return '0';
    if (value < 0.0001) return value.toExponential(4);
    if (value < 0.01) return value.toFixed(6);
    if (value < 1) return value.toFixed(4);
    if (value < 1000) return value.toFixed(2);
    return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  return (
    <section className="py-8 bg-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-blue-200 font-medium">Quick Tool</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Unit Converter
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Instantly convert between different weight units. Perfect for international 
              shipping, recipe conversions, and industrial calculations.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm">
                kg ↔ lb
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm">
                g ↔ oz
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm">
                Metric ↔ Imperial
              </span>
            </div>
          </motion.div>

          {/* Right Side - Converter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 text-gray-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Weight Converter</h3>
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Input Section */}
                <div className="grid grid-cols-[1fr,auto] gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      From
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-[#0056b3]/20 text-lg font-semibold"
                      placeholder="Enter value"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Unit
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                    >
                      {units.map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwap}
                    className="p-3 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:rotate-180"
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* Output Section */}
                <div className="grid grid-cols-[1fr,auto] gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={isConverting ? '...' : formatResult(result)}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-lg font-bold text-blue-600"
                      />
                      {isConverting && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Unit
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                    >
                      {units.map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Result Display */}
                <div className="mt-6 p-4 bg-blue-600/5 rounded-lg">
                  <p className="text-center text-gray-600">
                    <span className="font-semibold">{inputValue || '0'}</span>{' '}
                    {units.find(u => u.value === fromUnit)?.label.split('(')[0]} equals
                  </p>
                  <p className="text-center text-2xl font-bold text-blue-600 mt-1">
                    {formatResult(result)}{' '}
                    {units.find(u => u.value === toUnit)?.label.split('(')[0]}
                  </p>
                </div>

                {/* Quick Conversions */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-3">Quick Reference:</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <span className="font-semibold">1 kg</span> = 2.205 lb
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <span className="font-semibold">1 lb</span> = 0.454 kg
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <span className="font-semibold">1 oz</span> = 28.35 g
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}