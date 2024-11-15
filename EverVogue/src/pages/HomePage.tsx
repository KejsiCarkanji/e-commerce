import NavBars from "../common/components/NavBars";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <NavBars />
            <div style={{ height: '80vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                    width: '50%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    paddingLeft: '10%', 
                    zIndex: 2 
                }}>
                    <h1 style={{ 
                        fontSize: '4rem', 
                        fontWeight: 700, 
                        color: '#1a1a1a', 
                        marginBottom: '1rem' 
                    }}>
                        EverVogue
                    </h1>
                    <p style={{ 
                        fontSize: '1.5rem', 
                        color: '#4a4a4a', 
                        marginBottom: '2rem' 
                    }}>
                        Elevate Your Style
                    </p>
                    <button 
                        onClick={() => navigate('/products')}
                        style={{
                            width: 'fit-content',
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            backgroundColor: '#1a1a1a',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}
                    >
                        Explore Collection
                    </button>
                </div>
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '60%',
                    height: '100%',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1584917865442-de89df76afd3")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                padding: '4rem 10%'
            }}>
                {['New Arrivals', 'Trending', 'Bestsellers'].map((category) => (
                    <div 
                        key={category}
                        onClick={() => navigate('/products')}
                        style={{
                            height: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f0f0f0',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <h3 style={{
                            color: '#1a1a1a',
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            zIndex: 1
                        }}>
                            {category}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HomePage;