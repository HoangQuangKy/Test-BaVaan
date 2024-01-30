import { motion } from 'framer-motion'
import { fadeIn } from '../../variants';


const Introduction = () => {
    return (
        <div>
            <div className='flex flex-col items-start'>
                <motion.p
                    variants={fadeIn('up', 0.2)}
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                    className='h3 md:h2'>
                    Xin kính chào quý công ty{' '}
                    <motion.span
                        variants={fadeIn('up', 0.6)}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        className='text-red-300'

                    >
                        BAVAAN
                    </motion.span>
                    , tôi là{' '}
                    <motion.span
                        variants={fadeIn('down', 0.8)}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        className='text-red-300'
                    >
                        Hoàng Quang Kỳ.
                    </motion.span>
                    {' '}
                    <span>Ứng viên ứng tuyển vào vị trí {' '}
                        <motion.span
                            variants={fadeIn('down', 0.8)}
                            initial='hidden'
                            animate='show'
                            exit='hidden'
                            className='text-red-300'
                        >
                            Front-End Developer của công ty
                        </motion.span>
                    </span>
                </motion.p>
                <p className='h3 md:h2'>
                    Dưới đây là form thông tin , vui lòng điền một vài thông tin theo form dưới đây :
                </p>
            </div>
        </div>
    );
}

export default Introduction
