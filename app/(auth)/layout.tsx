const AuthLayout = ({
    children
}: {
    children: React.ReactElement.Node
}) => {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
      );
}
 
export default AuthLayout;