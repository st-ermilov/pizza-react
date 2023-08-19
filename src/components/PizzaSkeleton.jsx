import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="141" cy="115" r="116"/>
        <rect x="0" y="251" rx="12" ry="12" width="280" height="26"/>
        <rect x="2" y="302" rx="12" ry="12" width="280" height="93"/>
        <rect x="6" y="417" rx="12" ry="12" width="70" height="28"/>
        <rect x="142" y="406" rx="12" ry="12" width="136" height="48"/>
    </ContentLoader>
)

export default PizzaSkeleton