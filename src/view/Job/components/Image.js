import React from "react";
import { dnaComplement } from "seqvizcustom/utils/parser";

const reverse = (seq) => (seq.split("")
    .reverse()
    .join("")
);

const splitAt = (x, index) => [x.slice(0, index), x.slice(index)];

const rtTemplateFragments = (rtTemplate) => {
    //rtTemplate = 's'+rtTemplate;
    let first5, loopfirst, flip, looplast, last5, rest = '';
    [first5, rest] = splitAt(rtTemplate,5);
    [rest, last5] = splitAt(rest, rest.length-5);
    if (rest.length % 2 === 0) {
        [loopfirst, rest] = splitAt(rest, Math.floor(rest.length / 2));
        [flip, looplast] = splitAt(rest, 1)
    } else {
        [loopfirst, rest] = splitAt(rest, Math.floor(rest.length / 2));
        [flip, looplast] = splitAt(rest, 2)
    }
    return [first5, loopfirst, flip, looplast, last5];
};

export default ({spacer='', pbs='', rtTemplate=''}) => {
    rtTemplate = rtTemplate.toUpperCase();
    const [first5, loopfirst, flip, looplast, last5] = rtTemplateFragments(rtTemplate);
    //pbs = 'ABCDEFGHIJKLMNOPQRSTUV'
    const pbsLength = pbs.length;
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 900 450"
        version="1.1"
        viewBox="0 0 900 450"
        xmlSpace="preserve"
    >
        <path
            d="M422.3 61.6c-8.4-6.8-17-.3-24.8-6.9-6.3-5.4-7.2-16.2-5.4-23.5C397.7 8.4 434-.4 453.4.1c5.5.1 9.7 1 13.3 2.3 9.2 3.2 17.1 9.5 22.6 18.1 6.9 10.8 9.6 24 10.1 36.7.6 17.1 0 18.2 1.4 31.6 3.2 31.8 15.5 40 9.9 49-5.3 8.5-17.4 3.1-57.1 7.4-24.4 2.7-28.7 5-48 5.4-14.9.3-30.1-1.7-42.1-11.2-7.1-5.6-11.6-13.3-11.7-21.6-.1-5.1 1.6-9 2.4-11 .3-.7 5.7-12.6 15.7-16 13.8-4.7 21.5 11.5 38.6 8.8 7.8-1.2 17.9-6.4 20.5-15.8 2.3-8.2-.8-17.4-6.7-22.2z"
            className="st0"
        />
        <g className="st1">
            <path
                d="M365.7 94.9c13.8-4.7 21.5 11.5 38.6 8.8 6-.9 13.3-4.2 17.6-9.9-4.1 3.1-9.1 5-13.4 5.7-17.1 2.7-24.8-13.5-38.6-8.8-4.4 1.5-7.9 4.6-10.5 7.8 1.8-1.5 3.9-2.8 6.3-3.6zM500.7 88.8c-1.4-13.4-.8-14.5-1.4-31.6-.4-12.7-3.2-25.9-10.1-36.7-5.5-8.6-13.3-15-22.6-18.1C463 1.2 458.8.3 453.3.1c-15.8-.4-43.1 5.5-55.5 20.1 13.6-11.6 37.1-16.3 51.3-16 5.5.1 9.7 1 13.3 2.3 9.2 3.2 17.1 9.5 22.6 18.1 6.9 10.8 9.6 24 10.1 36.7.6 17.1 0 18.2 1.4 31.6 3.1 30.9 14.8 39.5 10.3 48.3 1.6-.8 2.8-1.9 3.7-3.4 5.7-9-6.6-17.3-9.8-49z"/>
        </g>
        <path
            d="M262.5 259.5c34.7 15.5 59.5 11.6 91 17.2 25.2 4.4 68.7 12.1 92 43.5 22.3 30.1 7.8 57.4 38.1 88.1 6.5 6.6 17.9 17.7 34.7 19.6 24.6 2.7 44.3-16.1 52.6-24.2 15.7-15.2 22.1-31.6 26.2-42.1 8.5-21.7 9.3-40.4 9.7-51 .5-13.6-.7-24.7-1.8-34.5-1.8-16.6-4.6-28.9-5.4-32.3-2.3-9.8-4.7-20.4-10.1-33.1-7.5-17.8-16.7-30.1-20.1-34.5-20.6-26.4-45.5-38.5-58.9-44.9-5.2-2.5-25.3-11.7-53.6-16.2-25.2-4-44.5-2.1-67.2 0-19.1 1.8-32.4 4.5-54.6 9-27.6 5.6-41.4 8.8-52.1 13.9-9.1 4.3-52.4 24.9-56.8 62.7-.4 3.8-2 20.7 8.1 36.6 7.7 12 18.9 18 28.2 22.2z"
            className="st2"
        />
        <path
            d="M605 275.9c-1.8-16.6-4.6-28.9-5.4-32.3-2.3-9.8-4.7-20.4-10.1-33.1-7.5-17.8-16.7-30.1-20.1-34.5-20.6-26.4-45.5-38.5-58.9-44.9-5.2-2.5-25.3-11.7-53.6-16.2-25.2-4-44.5-2.1-67.2 0-19.1 1.8-32.4 4.5-54.6 9-27.6 5.6-41.4 8.8-52.1 13.9-5.8 2.8-25.4 12.1-40 28.2 13.5-12.3 28.8-19.6 33.8-22 10.7-5.1 24.5-8.3 52.1-13.9 22.3-4.5 35.5-7.2 54.6-9 22.7-2.1 42-4 67.2 0 28.3 4.4 48.4 13.7 53.6 16.2 13.4 6.4 38.3 18.6 58.9 44.9 3.5 4.4 12.6 16.7 20.1 34.5 5.3 12.7 7.8 23.2 10.1 33.1.8 3.5 3.6 15.7 5.4 32.3 1.1 9.8 2.3 20.9 1.8 34.5-.4 10.6-1.2 29.4-9.7 51-3.8 9.6-9.5 24.1-22.5 38.2.9-.9 1.7-1.7 2.5-2.4 15.7-15.2 22.1-31.6 26.2-42.1 8.5-21.7 9.3-40.4 9.7-51 .5-13.5-.7-24.6-1.8-34.4z"
            className="st1"
        />
        <g>
            <path d="M474.4 301.6c1.7.4 3.3 1.1 4.7 2.1" className="st3"/>
            <path d="M481.7 291.4L476.9 302.4" className="st4"/>
            <path d="M479.2 303.7c1.5 1 2.8 2.3 4 3.8" className="st3"/>
            <path d="M489.5 296.7L481.3 305.4" className="st4"/>
            <path
                d="M483.2 307.5c.6.8 1.1 1.5 1.7 2.5l1.9 3"
                className="st3"
            />
            <path d="M495 303.4L484.9 309.9" className="st4"/>
            <path d="M486.8 312.9L490.7 318.8" className="st3"/>
            <path d="M498.8 309.3L488.8 315.9" className="st4"/>
            <path d="M490.7 318.8L494.6 324.7" className="st3"/>
            <path d="M502.7 315.2L492.7 321.8" className="st4"/>
            <path d="M494.6 324.7L498.6 330.6" className="st3"/>
            <path d="M506.6 321L496.6 327.7" className="st4"/>
            <path d="M498.6 330.6L502.6 336.5" className="st3"/>
            <path d="M510.5 326.8L500.6 333.6" className="st4"/>
            <path d="M502.6 336.5L506.6 342.3" className="st3"/>
            <path d="M514.5 332.6L504.6 339.4" className="st4"/>
            <path d="M506.6 342.3L510.7 348.1" className="st3"/>
            <path d="M518.5 338.4L508.6 345.2" className="st4"/>
            <path d="M510.7 348.1L514.7 353.9" className="st3"/>
            <path d="M522.5 344.1L512.7 351" className="st4"/>
            <path d="M514.7 353.9c1.3 1.9 2.7 3.8 3.9 5.7" className="st3"/>
            <path d="M526.6 350L516.7 356.8" className="st4"/>
            <path d="M518.6 359.6c1.4 2 2.1 3.2 2.6 5" className="st3"/>
            <path d="M530.8 356.6L520.2 362.2" className="st4"/>
            <path d="M521.2 364.6c.5 1.7.7 3.3.7 5.3" className="st3"/>
            <path d="M533.7 365.7L521.7 367.1" className="st4"/>
            <path d="M521.8 369.9c0 2-.4 4.5-.3 7.3" className="st3"/>
            <path d="M533.6 374L521.7 373.3" className="st4"/>
            <path
                d="M521.6 377.3c0 1.4.2 2.9.5 4.4.2.7.3 1.5.6 2.2.2.7.4 1.4.7 2.1"
                className="st3"
            />
            <path d="M533.8 379.2L522.1 381.6" className="st4"/>
            <path d="M523.4 385.9c1.2 2.8 2.7 5.2 4.5 7.3" className="st3"/>
            <path d="M535.6 383.5L525.4 389.8" className="st4"/>
            <path d="M527.9 393.2c1.8 2.2 3.9 4.1 6.2 5.7" className="st3"/>
            <path d="M538.9 387.4L530.8 396.3" className="st4"/>
            <path d="M534 398.9c2.3 1.6 4.8 2.9 7.5 3.8" className="st3"/>
            <path d="M543.1 390.4L537.7 401.1" className="st4"/>
            <path d="M541.6 402.7c2.7.9 5.6 1.5 8.5 1.5" className="st3"/>
            <path d="M547.8 392L545.7 403.8" className="st4"/>
            <path d="M550 404.2c2.9 0 5.9-.4 8.8-1.5" className="st3"/>
            <path d="M552.5 392.1L554.5 403.9" className="st4"/>
            <path d="M558.8 402.8c2.8-1.1 5.4-2.7 7.6-4.7" className="st3"/>
            <path d="M556.5 390.5L562.9 400.7" className="st4"/>
            <path d="M566.4 398.1c2.2-2 4-4.3 5.4-6.8" className="st3"/>
            <path d="M559.9 387.5L569.4 394.8" className="st4"/>
            <path d="M571.8 391.3c1.4-2.5 2.4-5.1 3.1-7.9" className="st3"/>
            <path d="M562.4 383.1L573.6 387.4" className="st4"/>
            <path d="M574.8 383.4c.7-2.7 1-5.6.8-8.4" className="st3"/>
            <path d="M563.6 378.1L575.5 379.3" className="st4"/>
            <path d="M575.6 375c-.1-2.9-.7-5.8-1.8-8.5" className="st3"/>
            <path d="M563.4 373.2L575.1 370.7" className="st4"/>
            <path d="M573.9 366.5c-1-2.7-2.5-5.2-4.2-7.4" className="st3"/>
            <path d="M561.6 368.6L572 362.7" className="st4"/>
            <path d="M569.6 359.1c-1.8-2.2-3.8-4.2-6.1-5.8" className="st3"/>
            <path d="M558.5 364.7L566.8 356" className="st4"/>
            <path d="M563.5 353.3c-2.3-1.7-4.8-3-7.5-3.9" className="st3"/>
            <path d="M554.3 361.7L559.9 351.1" className="st4"/>
            <path d="M556 349.4c-2.7-.9-5.5-1.5-8.4-1.6" className="st3"/>
            <path d="M549.6 360L551.9 348.2" className="st4"/>
            <path
                d="M547.6 347.7c-1.4-.1-2.6 0-3.6 0s-1.7-.1-2.2-.2"
                className="st3"
            />
            <path d="M543.8 359.7L544 347.7" className="st4"/>
            <path
                d="M541.8 347.5c-.1 0-.1 0-.2-.1l-.1-.1-.2-.1c-.3-.2-.7-.4-1-.6-.3-.2-.6-.5-.9-.7-.3-.2-.5-.5-.7-.8"
                className="st3"
            />
            <path d="M533.2 356.3L540.3 346.6" className="st4"/>
            <path
                d="M538.7 345.1c-.2-.3-.6-.7-.9-1.2-.3-.4-.6-.9-1-1.4l-2-2.8"
                className="st3"
            />
            <path d="M527 349.4L536.8 342.5" className="st4"/>
            <path d="M534.8 339.7L530.9 333.9" className="st3"/>
            <path d="M522.9 343.5L532.9 336.8" className="st4"/>
            <path d="M530.9 333.9L527.1 328" className="st3"/>
            <path d="M519 337.6L529 331" className="st4"/>
            <path d="M527.1 328L523.2 322.1" className="st3"/>
            <path d="M515.1 331.6L525.1 325.1" className="st4"/>
            <path d="M523.2 322.1L519.4 316.2" className="st3"/>
            <path d="M511.2 325.7L521.3 319.2" className="st4"/>
            <path d="M519.4 316.2L515.6 310.3" className="st3"/>
            <path d="M507.4 319.7L517.5 313.2" className="st4"/>
            <path d="M515.6 310.3L511.8 304.3" className="st3"/>
            <path d="M503.6 313.8L513.7 307.3" className="st4"/>
            <path d="M511.8 304.3L508 298.4" className="st3"/>
            <path d="M499.8 307.8L509.9 301.4" className="st4"/>
            <path d="M508 298.4L504.2 292.4" className="st3"/>
            <path d="M496 301.8L506.1 295.4" className="st4"/>
            <path d="M504.2 292.4L500.5 286.5" className="st3"/>
            <path d="M492.2 295.9L502.3 289.5" className="st4"/>
            <path d="M500.5 286.5L496.7 280.5" className="st3"/>
            <path d="M488.4 289.9L498.6 283.5" className="st4"/>
            <path d="M496.7 280.5L492.9 274.5" className="st3"/>
            <path d="M484.7 283.9L494.8 277.5" className="st4"/>
            <path d="M492.9 274.5L489.2 268.6" className="st3"/>
            <path d="M480.9 277.9L491 271.6" className="st4"/>
            <path
                d="M489.2 268.6l-1.9-3c-.6-1-1.3-2-1.8-2.9"
                className="st3"
            />
            <path d="M477.1 272L487.3 265.6" className="st4"/>
            <path d="M485.5 262.7c-1.1-1.8-2.1-3.8-3-5.8" className="st3"/>
            <path d="M473.3 265.4L483.9 259.9" className="st4"/>
            <path d="M482.5 256.9c-.9-2-1.8-4.1-2.6-6.1" className="st3"/>
            <path d="M470.1 258.4L481.2 253.8" className="st4"/>
            <path d="M479.9 250.7c-.8-2.1-1.4-4.2-2-6.3" className="st3"/>
            <path d="M467.4 251.3L478.9 247.6" className="st4"/>
            <path d="M477.9 244.4c-.6-2.1-1.1-4.3-1.5-6.4" className="st3"/>
            <path d="M465.4 243.9L477.1 241.2" className="st4"/>
            <path d="M476.4 238c-.4-2.2-.7-4.3-.9-6.5" className="st3"/>
            <path d="M464 236.4L475.9 234.7" className="st4"/>
            <path d="M475.5 231.5c-.2-2.2-.3-4.4-.2-6.5" className="st3"/>
            <path d="M463.3 228.7L475.3 228.2" className="st4"/>
            <path d="M475.3 224.9c0-2.2.2-4.3.4-6.5" className="st3"/>
            <path d="M463.4 220.9L475.4 221.7" className="st4"/>
            <path
                d="M475.7 218.5c.2-1.1.3-2.1.5-3.2s.4-2.1.7-3.2"
                className="st3"
            />
            <path d="M464.4 213.1L476.2 215.3" className="st4"/>
            <path
                d="M476.9 212.1c.3-1 .5-2.1.9-3.1l.5-1.5.6-1.5"
                className="st3"
            />
            <path d="M466.3 205.4L477.8 209" className="st4"/>
            <path d="M478.8 205.9l1.2-3c.4-1 .9-1.9 1.4-2.9" className="st3"/>
            <path d="M469.1 198.1L480 203" className="st4"/>
            <path
                d="M481.4 200.1c.5-1 1.1-1.9 1.6-2.8.5-.9 1.2-1.8 1.7-2.7"
                className="st3"
            />
            <path d="M472.7 191.1L483 197.2" className="st4"/>
            <path d="M484.7 194.5c1.2-1.8 2.5-3.5 4-5.1" className="st3"/>
            <path d="M477.2 184.6L486.6 191.9" className="st4"/>
            <path d="M488.7 189.4c1.4-1.6 2.9-3.2 4.5-4.7" className="st3"/>
            <path d="M482.3 178.7L490.9 187" className="st4"/>
            <path d="M493.2 184.7c1.6-1.5 3.3-2.9 5-4.3" className="st3"/>
            <path d="M487.9 173.4L495.7 182.5" className="st4"/>
            <path d="M498.3 180.5c1.7-1.4 3.6-2.6 5.5-3.9" className="st3"/>
            <path d="M494 168.7L500.9 178.5" className="st4"/>
            <path d="M503.7 176.6L509.6 172.7" className="st3"/>
            <path d="M500.1 164.6L506.6 174.7" className="st4"/>
            <g>
                <path d="M509.6 172.7L515.5 168.8" className="st3"/>
                <path d="M506 160.8L512.6 170.8" className="st4"/>
            </g>
            <g>
                <path d="M515.5 168.8L521.4 164.9" className="st3"/>
                <path d="M511.8 156.9L518.5 166.9" className="st4"/>
            </g>
            <g>
                <path d="M521.4 164.9L527.3 161" className="st3"/>
                <path d="M517.7 153L524.4 163" className="st4"/>
            </g>
            <g>
                <path d="M527.3 161L533.2 157" className="st3"/>
                <path d="M523.5 149.1L530.2 159" className="st4"/>
            </g>
            <g>
                <path d="M533.2 157L539 153" className="st3"/>
                <path d="M529.3 145.1L536.1 155" className="st4"/>
            </g>
            <g>
                <path d="M539 153L544.8 149" className="st3"/>
                <path d="M535.1 141.1L541.9 151" className="st4"/>
            </g>
            <g>
                <path d="M544.8 149L550.7 145" className="st3"/>
                <path d="M540.9 137.1L547.8 147" className="st4"/>
            </g>
            <g>
                <path d="M550.6 145L556.5 140.9" className="st3"/>
                <path d="M546.7 133.1L553.6 143" className="st4"/>
            </g>
            <g>
                <path d="M556.5 140.9L562.2 136.9" className="st3"/>
                <path d="M552.5 129.1L559.4 138.9" className="st4"/>
            </g>
            <g>
                <path d="M562.2 136.9L568 132.8" className="st3"/>
                <path d="M558.2 125L565.1 134.9" className="st4"/>
            </g>
            <g>
                <path d="M568 132.8L573.8 128.7" className="st3"/>
                <path d="M564 121L570.9 130.8" className="st4"/>
            </g>
            <g>
                <path d="M573.8 128.7L579.6 124.7" className="st3"/>
                <path d="M569.7 116.9L576.7 126.7" className="st4"/>
            </g>
            <g>
                <path d="M579.6 124.7L585.3 120.6" className="st3"/>
                <path d="M575.5 112.8L582.5 122.6" className="st4"/>
            </g>
            <g>
                <path d="M585.3 120.6L591.1 116.5" className="st3"/>
                <path d="M581.2 108.7L588.2 118.5" className="st4"/>
            </g>
            <g>
                <path d="M591.1 116.5L596.8 112.3" className="st3"/>
                <path d="M587 104.6L594 114.4" className="st4"/>
            </g>
            <g>
                <path d="M596.8 112.3L602.6 108.2" className="st3"/>
                <path d="M592.7 100.5L599.7 110.3" className="st4"/>
            </g>
            <g>
                <path d="M602.6 108.2L608.3 104.1" className="st3"/>
                <path d="M598.4 96.4L605.4 106.2" className="st4"/>
            </g>
            <g>
                <path d="M608.3 104.1L614 100" className="st3"/>
                <path d="M604.1 92.3L611.2 102" className="st4"/>
            </g>
            <g>
                <path d="M614 100L619.7 95.8" className="st3"/>
                <path d="M609.9 88.2L616.9 97.9" className="st4"/>
            </g>
            <g>
                <path d="M619.7 95.8L625.4 91.7" className="st3"/>
                <path d="M615.6 84L622.6 93.8" className="st4"/>
            </g>
            <g>
                <path
                    d="M625.4 91.7l1.4-1c.2-.2.3-.2.5-.3.2-.1.4-.3.6-.4.8-.5 1.7-.9 2.5-1.3"
                    className="st3"
                />
                <path d="M622 79.6L628 90" className="st4"/>
            </g>
            <g>
                <path d="M630.5 88.7c1.7-.7 3.5-1.1 5.3-1.2" className="st3"/>
                <path d="M630.4 76.2L633.1 87.9" className="st4"/>
            </g>
            <g>
                <path
                    d="M635.8 87.5c.9-.1 1.7 0 2.6.1.9.1 1.7.3 3.1.6"
                    className="st3"
                />
                <path d="M639.8 75.7L638.3 87.6" className="st4"/>
            </g>
            <g>
                <path
                    d="M641.4 88.2c.7.2 1.6.3 2.4.3.4 0 .8.1 1.2.1l1.2-.1c.8 0 1.5-.1 2.3-.2.8-.1 1.5-.3 2.2-.5"
                    className="st3"
                />
                <path d="M645.6 76.5L646.2 88.5" className="st4"/>
            </g>
            <g>
                <path d="M650.7 87.8c2.8-.7 5.4-1.9 7.8-3.3" className="st3"/>
                <path d="M650 75.4L654.7 86.4" className="st4"/>
            </g>
            <g>
                <path d="M658.5 84.5c2.4-1.4 4.6-3.2 6.6-5.1" className="st3"/>
                <path d="M654.5 72.7L661.9 82.1" className="st4"/>
            </g>
            <g>
                <path d="M665 79.4c2-1.9 3.7-4.3 5.1-6.7" className="st3"/>
                <path d="M658.2 69L667.8 76.2" className="st4"/>
            </g>
            <g>
                <path d="M670.1 72.7c1.4-2.4 2.4-5.2 3.1-7.9" className="st3"/>
                <path d="M660.7 64.5L671.9 68.8" className="st4"/>
            </g>
            <g>
                <path d="M673.2 64.8c.7-2.8.8-5.7.6-8.5" className="st3"/>
                <path d="M661.8 59.6L673.8 60.5" className="st4"/>
            </g>
            <g>
                <path d="M673.8 56.3c-.2-2.8-.7-5.6-1.6-8.2" className="st3"/>
                <path d="M661.5 54.5L673.2 52.1" className="st4"/>
            </g>
            <g>
                <path d="M672.1 48.1c-.9-2.6-2.1-5.1-3.7-7.5" className="st3"/>
                <path d="M659.8 49.5L670.5 44.2" className="st4"/>
            </g>
            <g>
                <path d="M668.5 40.6c-1.5-2.3-3.4-4.5-5.5-6.3" className="st3"/>
                <path d="M656.9 45.1L666 37.3" className="st4"/>
            </g>
            <g>
                <path d="M663 34.3c-2.1-1.9-4.5-3.5-7-4.7" className="st3"/>
                <path d="M653 41.7L659.7 31.7" className="st4"/>
            </g>
            <g>
                <path d="M656 29.6c-2.6-1.2-5.3-2-8-2.5" className="st3"/>
                <path d="M648.4 39.5L652 28.1" className="st4"/>
            </g>
            <g>
                <path d="M648 27.1c-2.7-.5-5.5-.6-8.3-.4" className="st3"/>
                <path d="M643.3 38.6L643.8 26.6" className="st4"/>
            </g>
            <g>
                <path d="M639.7 26.7c-2.7.2-5.5.7-8.1 1.6" className="st3"/>
                <path d="M637.9 39L635.6 27.2" className="st4"/>
            </g>
            <g>
                <path d="M631.6 28.3c-2.6.9-5.2 2-7.5 3.5" className="st3"/>
                <path d="M632.8 40.6L627.7 29.8" className="st4"/>
            </g>
            <g>
                <path
                    d="M624.1 31.8l-1.7 1.2c-.6.4-1.1.9-1.6 1.3-1.1.9-2.1 1.8-3 2.9"
                    className="st3"
                />
                <path d="M628.4 43.4L620.7 34.3" className="st4"/>
            </g>
            <g>
                <path d="M617.6 37.2c-1.9 2.1-3.7 4.9-4.6 7.9" className="st3"/>
                <path d="M625.3 47L615 40.8" className="st4"/>
            </g>
            <g>
                <path
                    d="M613 45.1c-.5 1.5-.8 3-.9 4.5l-.3 3.6"
                    className="st3"
                />
                <path d="M624.1 50.8L612.1 49.6" className="st4"/>
            </g>
            <g>
                <path
                    d="M611.8 53.2c-.1 1.2-.2 2.4-.2 3.7l-.1 1.9v1.8"
                    className="st3"
                />
                <path d="M623.6 57.5L611.6 56.9" className="st4"/>
            </g>
            <g>
                <path d="M611.5 60.6c0 1.9-.3 3.9-.8 5.8" className="st3"/>
                <path d="M623.2 65.1L611.3 63.5" className="st4"/>
            </g>
            <g>
                <path
                    d="M610.7 66.4c-.2 1-.5 2-.9 3-.2.5-.3 1-.5 1.5l-.3.8"
                    className="st3"
                />
                <path d="M621.3 73.2L609.9 69.4" className="st4"/>
            </g>
            <g>
                <path
                    d="M609 71.7c0 .2-.2.3-.3.4l-.9.8-2.7 2.2"
                    className="st3"
                />
                <path d="M615.4 82.2L607.8 72.8" className="st4"/>
            </g>
            <g>
                <path d="M605.1 75.1L599.6 79.5" className="st3"/>
                <path d="M609.9 86.6L602.3 77.3" className="st4"/>
            </g>
            <g>
                <path d="M599.6 79.5L594.1 84" className="st3"/>
                <path d="M604.4 91.1L596.8 81.7" className="st4"/>
            </g>
            <g>
                <path d="M594.1 84L588.6 88.4" className="st3"/>
                <path d="M598.9 95.5L591.4 86.2" className="st4"/>
            </g>
            <g>
                <path d="M588.6 88.4L583.1 92.8" className="st3"/>
                <path d="M593.4 99.9L585.9 90.6" className="st4"/>
            </g>
            <g>
                <path d="M583.1 92.8L577.6 97.3" className="st3"/>
                <path d="M587.9 104.4L580.4 95.1" className="st4"/>
            </g>
            <g>
                <path
                    d="M577.6 97.3l-2.7 2.2-.1.1-.2.1c-.3.2-.6.4-.8.6l-1.5 1.1"
                    className="st3"
                />
                <path d="M582.5 108.8L574.9 99.5" className="st4"/>
            </g>
            <g>
                <path d="M572.2 101.3L566.5 105.5" className="st3"/>
                <path d="M576.4 113.1L569.4 103.5" className="st4"/>
            </g>
            <g>
                <path d="M566.5 105.5c-1.9 1.4-3.8 2.7-5.7 4" className="st3"/>
                <path d="M570.6 117.3L563.7 107.5" className="st4"/>
            </g>
            <g>
                <path
                    d="M560.9 109.5c-1.9 1.3-3.8 2.6-5.7 3.8"
                    className="st3"
                />
                <path d="M564.7 121.5L558 111.5" className="st4"/>
            </g>
            <g>
                <path
                    d="M555.1 113.4c-1.9 1.3-3.9 2.4-5.8 3.6"
                    className="st3"
                />
                <path d="M558.5 125.4L552.2 115.2" className="st4"/>
            </g>
            <g>
                <path
                    d="M549.3 117c-1 .5-2 1.2-2.9 1.6-1 .5-1.9 1-2.9 1.4"
                    className="st3"
                />
                <path d="M552.1 129.2L546.4 118.6" className="st4"/>
            </g>
            <g>
                <path
                    d="M543.5 120c-1 .4-1.9.9-2.9 1.2l-1.5.6-1.5.5"
                    className="st3"
                />
                <path d="M544.8 132.5L540.6 121.2" className="st4"/>
            </g>
            <g>
                <path
                    d="M537.5 122.3c-1 .4-2.1.6-3.1.8-1 .2-2.1.5-3.2.6"
                    className="st3"
                />
                <path d="M537.2 134.8L534.5 123.1" className="st4"/>
            </g>
            <g>
                <path d="M531.3 123.8c-2.1.4-4.3.6-6.5.8" className="st3"/>
                <path d="M529.5 136.2L528.1 124.2" className="st4"/>
            </g>
            <g>
                <path d="M524.8 124.6c-2.2.1-4.4.2-6.6.1" className="st3"/>
                <path d="M521.8 136.7L521.5 124.7" className="st4"/>
            </g>
            <g>
                <path d="M518.2 124.7c-2.2 0-4.5-.2-6.9-.3" className="st3"/>
                <path d="M514.2 136.5L514.8 124.6" className="st4"/>
            </g>
        </g>
        <g>
            <text className="st5 st6" transform="translate(69.166 201.023)">
                5&apos;
            </text>
            <text className="st5 st6" transform="translate(70.365 272.69)">
                3&apos;
            </text>
            <text className="st5 st7" transform="translate(256.166 259.223)">
                {dnaComplement(spacer).compSeq}
            </text>
            <path d="M56.8 252.5L248.8 251.5" className="st8"/>
            <path d="M55.8 213L247.8 212" className="st8"/>
            <path d="M72.8 219L72.8 243" className="st8"/>
            <path d="M237.8 219L237.8 243" className="st8"/>
            <path d="M211.3 219L211.3 243" className="st8"/>
            <path d="M89.3 219L89.3 243" className="st8"/>
            <path d="M105.8 219L105.8 243" className="st8"/>
            <path d="M124.3 219L124.3 243" className="st8"/>
            <path d="M184.3 219L184.3 243" className="st8"/>
            <path d="M140.8 219L140.8 243" className="st8"/>
            <path d="M167.8 219L167.8 243" className="st8"/>
            <path d="M80.4 219L80.4 243" className="st8"/>
            <path d="M158.9 219L158.9 243" className="st8"/>
            <path d="M245.9 219L245.9 243" className="st8"/>
            <path d="M229.4 219L229.4 243" className="st8"/>
            <path d="M219.9 219L219.9 243" className="st8"/>
            <path d="M96.9 219L96.9 243" className="st8"/>
            <path d="M115.4 219L115.4 243" className="st8"/>
            <path d="M202.4 219L202.4 243" className="st8"/>
            <path d="M131.9 219L131.9 243" className="st8"/>
            <path d="M193.9 219L193.9 243" className="st8"/>
            <path d="M149.4 219L149.4 243" className="st8"/>
            <path d="M176.4 219L176.4 243" className="st8"/>
            <text className="st5 st6" transform="translate(615.473 200.071)">
                3&apos;
            </text>
            <text className="st5 st6" transform="translate(615.473 271.737)">
                5&apos;
            </text>
            <g>
                <path d="M478 251.5L670 250.5" className="st8"/>
                <path d="M477.6 212L669.6 211" className="st8"/>
            </g>
            <g>
                <path d="M537.7 221.7L537.7 234" className="st10"/>
                <path d="M523.2 221.7L523.2 234" className="st10"/>
                <path d="M508.7 221.7L508.7 234" className="st10"/>
            </g>
            <text className="st11 st12 st7" transform="translate(256.166 301.005)">
                {spacer.replace('T', 'U')}
            </text>
            <text className="st11 st12 st7" transform="rotate(30 48.05 910.285)">
                {reverse(first5)}
            </text>
            <text className="st5 st7" transform="rotate(30 -139.884 921.731)">
                {spacer.substring(17, 20)}
            </text>
            <g>
                <path d="M483 219L483 243" className="st8"/>
                <path d="M648 219L648 243" className="st8"/>
                <path d="M621.5 219L621.5 243" className="st8"/>
                <path d="M499.5 219L499.5 243" className="st8"/>
                <path d="M516 219L516 243" className="st8"/>
                <path d="M534.5 219L534.5 243" className="st8"/>
                <path d="M594.5 219L594.5 243" className="st8"/>
                <path d="M551 219L551 243" className="st8"/>
                <path d="M578 219L578 243" className="st8"/>
                <path d="M490.7 219L490.7 243" className="st8"/>
                <path d="M569.2 219L569.2 243" className="st8"/>
                <path d="M656.2 219L656.2 243" className="st8"/>
                <path d="M639.7 219L639.7 243" className="st8"/>
                <path d="M630.2 219L630.2 243" className="st8"/>
                <path d="M507.2 219L507.2 243" className="st8"/>
                <path d="M525.7 219L525.7 243" className="st8"/>
                <path d="M612.7 219L612.7 243" className="st8"/>
                <path d="M542.2 219L542.2 243" className="st8"/>
                <path d="M604.2 219L604.2 243" className="st8"/>
                <path d="M559.7 219L559.7 243" className="st8"/>
                <path d="M586.7 219L586.7 243" className="st8"/>
            </g>
            <g>
                <text className="st5 st7" transform="rotate(-30 526.818 -360.396)">
                    {spacer.substring(0, 17)}
                </text>
                <text transform="rotate(-30 434.94 -420.564)">
                    <tspan x={(13-pbsLength)*10} y="0" className="st11 st12 st7">
                        {reverse(pbs)}
                    </tspan>
                </text>
                {pbsLength > 0 && <path d="M385 97.9L397 118.7" className="st8"/>}
                {pbsLength > 1 && <path d="M371.6 102.7L383.6 123.4" className="st8"/>}
                {pbsLength > 2 && <path d="M363 107.6L375 128.4" className="st8"/>}
                {pbsLength > 3 && <path d="M353.3 113.2L365.3 134" className="st8"/>}
                {pbsLength > 4 && <path d="M344.6 118.3L356.6 139.1" className="st8"/>}
                {pbsLength > 5 && <path d="M335.5 123.5L347.5 144.3" className="st8"/>}
                {pbsLength > 6 && <path d="M326.8 128.5L338.8 149.3" className="st8"/>}
                {pbsLength > 7 && <path d="M317 134.2L329 155" className="st8"/>}
                {pbsLength > 8 && <path d="M309 138.8L321 159.6" className="st8"/>}
                {pbsLength > 9 && <path d="M300.2 143.9L312.2 164.7" className="st8"/>}
                {pbsLength > 10 && <path d="M291.1 149.1L303.1 169.9" className="st8"/>}
                {pbsLength > 11 && <path d="M281.4 154.7L293.4 175.5" className="st8"/>}
                {pbsLength > 12 && <path d="M272.6 159.8L284.6 180.6" className="st8"/>}
                {pbsLength > 13 && <path d="M263.6 165L275.6 185.8" className="st8"/>}
                {pbsLength > 14 && <path d="M255.8 169.5L267.8 190.3" className="st8"/>}
                {pbsLength > 15 && <path d="M246.7 174.8L258.7 195.5" className="st8"/>}
                {pbsLength > 16 && <path d="M236.9 180.4L248.9 201.2" className="st8"/>}
            </g>
            <text transform="translate(386.513 92.29)">
                <tspan x="5" y="-5" className="st11 st12 st7">
                    {reverse(last5)}
                </tspan>
            </text>
            <text transform="translate(458.702 35.889)">
                <tspan x={(loopfirst.length-5)*3-5*(flip.length-1)} y={(5-loopfirst.length)*11} className="st11 st12 st7">
                    {flip}
                </tspan>
            </text>
            <text transform="rotate(-75.001 277.498 -245.58)">
                <tspan x="10" y="0" className="st11 st12 st7">
                    {reverse(looplast)}
                </tspan>
            </text>
            <text
               
                transform="scale(-1) rotate(-75.001 -260.38 288.099)"
            >
                <tspan x={(5-loopfirst.length)*11} y="0" className="st11 st12 st7">
                    {reverse(loopfirst)}
                </tspan>
            </text>
            <g>
                <path d="M262 261.5L262 285.5" className="st8"/>
                <path d="M272.7 261.5L272.7 285.5" className="st8"/>
                <path d="M283.4 261.5L283.4 285.5" className="st8"/>
                <path d="M294.1 261.5L294.1 285.5" className="st8"/>
                <path d="M304.8 261.5L304.8 285.5" className="st8"/>
                <path d="M315.5 261.5L315.5 285.5" className="st8"/>
                <path d="M326.2 261.5L326.2 285.5" className="st8"/>
                <path d="M336.9 261.5L336.9 285.5" className="st8"/>
                <path d="M347.6 261.5L347.6 285.5" className="st8"/>
                <path d="M358.3 261.5L358.3 285.5" className="st8"/>
                <path d="M370 261.5L370 285.5" className="st8"/>
                <path d="M380.7 261.5L380.7 285.5" className="st8"/>
                <path d="M391.4 261.5L391.4 285.5" className="st8"/>
                <path d="M402.1 261.5L402.1 285.5" className="st8"/>
                <path d="M412.8 261.5L412.8 285.5" className="st8"/>
                <path d="M423.5 261.5L423.5 285.5" className="st8"/>
                <path d="M434.2 261.5L434.2 285.5" className="st8"/>
                <path d="M444.9 261.5L444.9 285.5" className="st8"/>
                <path d="M455.6 261.5L455.6 285.5" className="st8"/>
                <path d="M466.3 261.5L466.3 285.5" className="st8"/>
            </g>
        </g>
    </svg>
}