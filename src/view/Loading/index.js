import React from "react";

import './Loading.css'
import { Card } from "react-bootstrap";

export const Loading = props => {

    const styles = {
        beforeAfter: {
            content: "",
            display: 'inline-block',
            width: props.size + 'px',
            height: props.size + 'px',
            borderRadius: '50%',
            position: 'absolute',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        before: {
            backgroundColor: props.colors[0],
            transform: 'translateY(-200%)',
            WebkitTransform: 'translateY(-200%)',
            animation: 'animBefore 1s linear infinite',
            WebkitAnimation: 'animBefore 1s linear infinite',
            },
        nucleotide: {
            display: 'inline-block',
            position: 'relative',
            verticalAlign: 'middle',
            //marginRight: '9px',
            height: '100%',
            lineHeight: '100%',
        },
        after: {
            backgroundColor: props.colors[1],
            transform: 'translateY(200%)',
            WebkitTransform: 'translateY(200%)',
            animation: 'animAfter 1s linear infinite',
            WebkitAnimation: 'animAfter 1s linear infinite',
        }
    };

    return <div
            style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '100%', display: 'inline-block', ...props.style}}>
            { [...Array(props.count)].map((_, i) => (
                <React.Fragment key={i}>
                    <div style={{
                        ...styles.beforeAfter,
                        ...styles.before,
                        animationDelay: - (i + 1) * 0.9 + 's',
                    }}/>
                    <div style={{
                        ...styles.beforeAfter,
                        ...styles.after,
                        animationDelay: - (i + 1) * 0.9 + 's',
                    }}/>
                    <span style={{
                        marginRight: props.size * 1.5 + 'px',
                        ...styles.nucleotide,
                    }} />
                </React.Fragment>
            ))}
        </div>
};

Loading.defaultProps = {
    count: 10,
    colors: ["#00F", "#777"],
    size: 6,
};


export const LoadingCard = (props) => (
    <Card>
        <Card.Body style={{ textAlign: 'center', lineHeight: "calc(200vh - 40px)", height: "200vh", ...props.style }}>
            <Loading size={props.size} />
        </Card.Body>
    </Card>
);



export default Loading;