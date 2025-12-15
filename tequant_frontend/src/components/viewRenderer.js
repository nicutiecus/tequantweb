const ViewRenderer = ({ pageName, onNavigate }) => {
    switch (pageName) {
        case 'Home':
            return <HomePage onNavigate={onNavigate} />;
        
        case 'SoftwareDev':
        case 'Courses': 
            return <SoftwareDevLanding onNavigate={onNavigate} />;
            
        case 'Register':
        case 'Enrollment':
            return <EnrollmentPage onNavigate={onNavigate} />;
            
        case 'Pricing':
            return <div className="p-8 text-center text-xl">Pricing Plans Coming Soon...</div>;
        
        default:
            return <HomePage onNavigate={onNavigate} />;
    }
}
export default ViewRenderer
;