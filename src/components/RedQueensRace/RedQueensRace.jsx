import React, { useState } from 'react';
import useWebAnimations from '@wellyshen/use-web-animations';
import cx from 'classnames';
import styles from './RedQueensRace.module.css';

const RedQueensRace = () => {
    const [ score, setScore ] = useState(0);
    const { ref: aliceRef, getAnimation: aliceAnimation } = useWebAnimations({
        id: "alice",
        keyframes: { transform: [ 'translateY(-100%)' ] },
        timing: {
            duration: 600,
            easing: 'steps(7, end)',
            direction: 'reverse',
            iterations: Infinity,
            playbackRate: 1,
        },
        onReady: () => setInterval( () => {
            speedDown();
            // calcScore();
        }, 500 ),
        onUpdate: () => calcScore(),
    });
    const { ref: foreground1Ref, getAnimation: fore1Animation } = useWebAnimations({
        id: 'foreground1',
        keyframes: { transform: [ 'translateX(100%)', 'translateX(-100%)' ]},
        timing: { duration: 12000, iterations: Infinity, },
        onReady: ({ animation }) => animation.currentTime = animation.effect.getTiming().duration / 2,
    });
    const { ref: foreground2Ref, getAnimation: fore2Animation } = useWebAnimations({
        id: 'foreground2',
        keyframes: { transform: [ 'translateX(100%)', 'translateX(-100%)' ]},
        timing: { duration: 12000, iterations: Infinity, },
    });
    const { ref: background1Ref, getAnimation: back1Animation } = useWebAnimations({
        id: 'background1',
        keyframes: { transform: [ 'translateX(100%)', 'translateX(-100%)' ]},
        timing: { duration: 36000, iterations: Infinity, },
        onReady: ({ animation }) => animation.currentTime = animation.effect.getTiming().duration / 2,
    });
    const { ref: background2Ref, getAnimation: back2Animation } = useWebAnimations({
        id: 'background2',
        keyframes: { transform: [ 'translateX(100%)', 'translateX(-100%)' ]},
        timing: { duration: 36000, iterations: Infinity, },
    });

    // For increasing speed when the screen is clicked/touched.
    const speedUp = () => {
        aliceAnimation().updatePlaybackRate( aliceAnimation().playbackRate * 1.1 );
        fore1Animation().updatePlaybackRate( fore1Animation().playbackRate * 1.1 );
        fore2Animation().updatePlaybackRate( fore2Animation().playbackRate * 1.1 );
        back1Animation().updatePlaybackRate( back1Animation().playbackRate * 1.1 );
        back2Animation().updatePlaybackRate( back2Animation().playbackRate * 1.1 );
    }
    // For decreasing speed every 500 ms.
    const speedDown = () => {
        // Speed down alice.
        if ( aliceAnimation().playbackRate > 0.4 )
            aliceAnimation().updatePlaybackRate( aliceAnimation().playbackRate * 0.9 );
        
        // Speed down the scenery.
        const sceneries = [ fore1Animation, fore2Animation, back1Animation, back2Animation ];
        if (aliceAnimation().playbackRate < .8) {
            sceneries.forEach(function(anim) {
                anim().updatePlaybackRate( aliceAnimation().playbackRate/2 * -1 );
            });
        } else if (aliceAnimation().playbackRate > 1.2) {
            sceneries.forEach(function(anim) {
                anim().updatePlaybackRate( aliceAnimation().playbackRate/2 );
            });
        } else {
            sceneries.forEach(function(anim) {
                anim().updatePlaybackRate( 0 );    
            });
        }   
    }
    const calcScore = () => setScore( score + fore1Animation().playbackRate / 100 );

    return (
        <div className={styles.wrapper} onClick={speedUp} onTouchEnd={speedUp}>
            <div className={styles.sky}></div>
            <div className={styles.earth}></div>

            <div className={styles.redQueenAndAlice}>
                <img 
                    ref={aliceRef}
                    className={styles.redQueenAndAliceSprite}
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x"
                    alt="Alice and the Red Queen running to stay in place."
                />
            </div>

            {/* Items moving in foreground. */}
            <div className={cx(styles.scenery, styles.foreground1)} ref={foreground1Ref}>
                <img 
                    className={cx(styles.palm3, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" 
                    alt=" "
                />
            </div>
            <div className={cx(styles.scenery, styles.foreground2)} ref={foreground2Ref}>
                <img 
                    className={cx(styles.bush, styles.image)}
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" 
                    alt=" "
                />
                <img 
                    className={cx(styles.wRookUpright, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" 
                    alt=" "
                />
            </div>

            {/* Items moving in background. */}
            <div className={cx(styles.scenery, styles.background1)} ref={background1Ref}>
                <img 
                    className={cx(styles.rPawnUpright, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" 
                    alt=" "
                />
                <img 
                    className={cx(styles.wRook, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" 
                    alt=" "
                />
                <img 
                    className={cx(styles.palm1, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" 
                    alt=" "
                />
            </div>
            <div className={cx(styles.scenery, styles.background2)} ref={background2Ref}>
                <img 
                    className={cx(styles.rPawn, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" 
                    alt=" "
                />

                <img 
                    className={cx(styles.rKnight, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" 
                    alt=" "
                />
                <img 
                    className={cx(styles.palm2, styles.image)} 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
                    srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" 
                    alt=" "
                />
            </div>

            <div className={styles.scoreCard}>
                {`${Math.floor(score)} m`}
            </div>

            {/* <div>
                Alice has to cross this valley (1000 m). But doing this in the Wonderland is not an easy task. 
                She has to keep running to stay in place or else she starts lagging behind. 
                She has to run double the normal speed to move forward. 
                Help her by clicking the screen repeatedly to make her run faster.
            </div> */}

        </div>
    )
}

export default RedQueensRace
