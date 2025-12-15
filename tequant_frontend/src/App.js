import './App.css';
import Main from './components/main';


function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}
export default App
{/* export default App;
const [pageName, setPageName] = useState('Home');
  const [user, setUser] = useState(null); 
  
  const setCurrentPage = (to) => {
    if (to && to.preventDefault) return;

    const newPage = typeof to === 'string' ? to : to.page;
    window.scrollTo(0, 0);
    setPageName(newPage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
      <Navbar onNavigate={setCurrentPage} activePage={pageName} user={user} />
      
      <main className="flex-grow w-full">
          <ViewRenderer pageName={pageName} onNavigate={setCurrentPage} />
      </main>

      <Footer onNavigate={setCurrentPage} activePage={pageName} />
    </div>
  );
  */}