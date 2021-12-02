import React from 'react'
import { Affix, Button, Text, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { AiOutlineArrowUp } from "react-icons/ai";

function ScrollTopButton() {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            className="bg-pBlue"
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            <AiOutlineArrowUp />
                        </Button>
                    )}
                </Transition>
            </Affix>
        </>
    )
}

export default ScrollTopButton
