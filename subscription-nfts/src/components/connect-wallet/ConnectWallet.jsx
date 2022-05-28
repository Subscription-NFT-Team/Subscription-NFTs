import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../../utils/common';

export default function ConnectWallet() {
    let navigate = useNavigate();
    const handleClick = () => {
        connectWallet();
        navigate("creator-or-buyer");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
        >
            Connect Wallet
        </Button>
    );
}