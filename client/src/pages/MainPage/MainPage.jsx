import React from 'react';
import Home from '../../components/Home/Home';
import Learn from '../../components/Learn/Learn';
import Download from '../../components/Download/Download';
import News from '../../components/News/News';
import { motion } from 'framer-motion';

const MainPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Home />
            <Learn />
            <Download />
            <News />
        </motion.div>
    );
};

export default MainPage;
