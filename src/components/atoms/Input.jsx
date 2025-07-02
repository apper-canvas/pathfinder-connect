import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${icon ? 'pl-11' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
              : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-white hover:border-gray-300'
            }
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input