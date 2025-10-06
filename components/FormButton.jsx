export default function FormButton({ 
  children, 
  disabled = false,
  onClick,
  type = "button", 
  className, 
  isLoading = false, 
  buttonColor = "bg-white",
  ...props 
}) {
  function Loader() {
    return (
      <div className={`w-full h-full rounded-full top-0 start-0 flex justify-center items-center absolute ${buttonColor}`}>
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <button 
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`text-center btn-lg disabled:opacity-50 relative ${className} ${buttonColor}`}
      {...props}
    >
      {children}
      {isLoading && <Loader />}
    </button>
  );
}
