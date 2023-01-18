let Form = ({ action, method,className,children }) => {
  return (
    <div>
      <form action={action} method={method} className={className}>
        {children}
      </form>
    </div>
  )
}
export default Form
