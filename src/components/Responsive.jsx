import React from 'react'
import styled from 'styled-components'

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%
    margin: 0 auto;
    height: 450px;
    display: flex;
    justify-content: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    border: 1px solid black;

    @media (min-width: 768px) {
        width: 768px;
    }

    @media (min-width: 1024px) {
        width: 1024px;
    }

`;

const Responsive = ({children, ...rest}) => {
  return (
    <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
  )
}

export default Responsive