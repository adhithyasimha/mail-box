import './styles.css';
import { useState, JSX} from 'react';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='burgerMenu'>
            <svg
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    fill={isOpen ? 'red' : 'black'}
                    d="M0 0h24v24H0z"
                    fillOpacity="0.1"
                />
                <path
                    fill={isOpen ? 'red' : 'black'}
                    d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                />
            </svg>
            {isOpen && (
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            )}
        </div>
    );
};

export default BurgerMenu;
