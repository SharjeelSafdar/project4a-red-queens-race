import React from 'react';
import useWebAnimations from '@wellyshen/use-web-animations';
import { myBird, bird1, bird2, cloud1, cloud2 } from '../../images/images';
import styles from './FlyingBird.module.css';

export const FlyingBird = () => {
    const { ref: cloudsRef, getAnimation: getAnimationClouds } = useWebAnimations({
        keyframes: {
            transform: [ "translateX(100%)", "translateX(-100%)" ]
        },
        timing: {
            duration: 60000,
            iterations: Infinity,
        },
        onReady: () => {
            setInterval(() => {
                if (getAnimationClouds().playbackRate > 1)
                    getAnimationClouds().updatePlaybackRate(
                        getAnimationClouds().playbackRate * 0.9
                    );
            }, 1000)
        },
        // onUpdate: () => {
        //     console.log(getAnimationClouds().playbackRate)
        // }
    });
    const { ref: birdsRef, getAnimation: getAnimationBirds } = useWebAnimations({
        keyframes: {
            transform: [ "translateX(100%)", "translateX(-100%)" ]
        },
        timing: {
            duration: 36000,
            iterations: Infinity,
        },
        onReady: () => {
            setInterval(() => {
                if (getAnimationBirds().playbackRate > 1)
                getAnimationBirds().updatePlaybackRate(
                    getAnimationBirds().playbackRate * 0.9
                );
            }, 1000)
        }
    });
    const speedUp = () => {
        getAnimationClouds().updatePlaybackRate(
            getAnimationClouds().playbackRate * 1.1
        );
        getAnimationBirds().updatePlaybackRate(
            getAnimationBirds().playbackRate * 1.1
        );
    }

    return (
        <div className={styles.wrapper} onClick={speedUp} onTouchEnd={speedUp}>
            <div className={styles.myBird}>
                <img src={myBird} alt="My Bird" />
            </div>

            <div className={styles.background} ref={cloudsRef} >
                <img src={cloud1} alt="Cloud" className={styles.cloud1} />
                <img src={cloud2} alt="Cloud" className={styles.cloud2} />
            </div>

            <div className={styles.background} ref={birdsRef}>
                <img src={bird1} alt="Bird" className={styles.bird1} />
                <img src={bird2} alt="Bird" className={styles.bird2} />
            </div>
        </div>
    )
}


