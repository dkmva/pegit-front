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
    rtTemplate = rtTemplate.toUpperCase().replaceAll('T', 'U');
    pbs = pbs.replaceAll('T', 'U')
    const [first5, loopfirst, flip, looplast, last5] = rtTemplateFragments(rtTemplate);
    const pbsLength = pbs.length;
    const spacerLength = spacer.length;
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 900 450"
        version="1.1"
        viewBox="0 0 900 450"
        xmlSpace="preserve"
    >
        <g>
	<path className="st0" d="M304.5,388.5c8.4,6.8,17,0.3,24.8,6.9c6.3,5.4,7.2,16.2,5.4,23.5c-5.6,22.8-41.9,31.6-61.3,31.1
		c-5.5-0.1-9.7-1-13.3-2.3c-9.2-3.2-17.1-9.5-22.6-18.1c-6.9-10.8-9.6-24-10.1-36.7c-0.6-17.1,0-18.2-1.4-31.6
		c-3.2-31.8-15.5-40-9.9-49c5.3-8.5,17.4-3.1,57.1-7.4c24.4-2.7,28.7-5,48-5.4c14.9-0.3,30.1,1.7,42.1,11.2
		c7.1,5.6,11.6,13.3,11.7,21.6c0.1,5.1-1.6,9-2.4,11c-0.3,0.7-5.7,12.6-15.7,16c-13.8,4.7-21.5-11.5-38.6-8.8
		c-7.8,1.2-17.9,6.4-20.5,15.8C295.5,374.5,298.6,383.7,304.5,388.5z"/>
            <g className="st1">
		<path d="M361.1,355.2c-13.8,4.7-21.5-11.5-38.6-8.8c-6,0.9-13.3,4.2-17.6,9.9c4.1-3.1,9.1-5,13.4-5.7c17.1-2.7,24.8,13.5,38.6,8.8
			c4.4-1.5,7.9-4.6,10.5-7.8C365.6,353.1,363.5,354.4,361.1,355.2z"/>
                <path d="M226.1,361.3c1.4,13.4,0.8,14.5,1.4,31.6c0.4,12.7,3.2,25.9,10.1,36.7c5.5,8.6,13.3,15,22.6,18.1
			c3.6,1.2,7.8,2.1,13.3,2.3c15.8,0.4,43.1-5.5,55.5-20.1c-13.6,11.6-37.1,16.3-51.3,16c-5.5-0.1-9.7-1-13.3-2.3
			c-9.2-3.2-17.1-9.5-22.6-18.1c-6.9-10.8-9.6-24-10.1-36.7c-0.6-17.1,0-18.2-1.4-31.6c-3.1-30.9-14.8-39.5-10.3-48.3
			c-1.6,0.8-2.8,1.9-3.7,3.4C210.6,321.3,222.9,329.6,226.1,361.3z"/>
	</g>
            <g>
		<path className="st2" d="M464.3,190.6c-34.7-15.5-59.5-11.6-91-17.2c-25.2-4.4-68.7-12.1-92-43.5c-22.3-30.1-7.8-57.4-38.1-88.1
			c-6.5-6.6-17.9-17.7-34.7-19.6c-24.6-2.7-44.3,16.1-52.6,24.2c-15.7,15.2-22.1,31.6-26.2,42.1c-8.5,21.7-9.3,40.4-9.7,51
			c-0.5,13.6,0.7,24.7,1.8,34.5c1.8,16.6,4.6,28.9,5.4,32.3c2.3,9.8,4.7,20.4,10.1,33.1c7.5,17.8,16.7,30.1,20.1,34.5
			c20.6,26.4,45.5,38.5,58.9,44.9c5.2,2.5,25.3,11.7,53.6,16.2c25.2,4,44.5,2.1,67.2,0c19.1-1.8,32.4-4.5,54.6-9
			c27.6-5.6,41.4-8.8,52.1-13.9c9.1-4.3,52.4-24.9,56.8-62.7c0.4-3.8,2-20.7-8.1-36.6C484.8,200.8,473.6,194.8,464.3,190.6z"/>
                <path className="st1" d="M121.8,174.2c1.8,16.6,4.6,28.9,5.4,32.3c2.3,9.8,4.7,20.4,10.1,33.1c7.5,17.8,16.7,30.1,20.1,34.5
			c20.6,26.4,45.5,38.5,58.9,44.9c5.2,2.5,25.3,11.7,53.6,16.2c25.2,4,44.5,2.1,67.2,0c19.1-1.8,32.4-4.5,54.6-9
			c27.6-5.6,41.4-8.8,52.1-13.9c5.8-2.8,25.4-12.1,40-28.2c-13.5,12.3-28.8,19.6-33.8,22c-10.7,5.1-24.5,8.3-52.1,13.9
			c-22.3,4.5-35.5,7.2-54.6,9c-22.7,2.1-42,4-67.2,0c-28.3-4.4-48.4-13.7-53.6-16.2c-13.4-6.4-38.3-18.6-58.9-44.9
			c-3.5-4.4-12.6-16.7-20.1-34.5c-5.3-12.7-7.8-23.2-10.1-33.1c-0.8-3.5-3.6-15.7-5.4-32.3c-1.1-9.8-2.3-20.9-1.8-34.5
			c0.4-10.6,1.2-29.4,9.7-51c3.8-9.6,9.5-24.1,22.5-38.2c-0.9,0.9-1.7,1.7-2.5,2.4c-15.7,15.2-22.1,31.6-26.2,42.1
			c-8.5,21.7-9.3,40.4-9.7,51C119.5,153.3,120.7,164.4,121.8,174.2z"/>
	</g>
            <g>
		<g>
			<g>
				<g>
					<path className="st3" d="M252.4,148.5c-1.7-0.4-3.3-1.1-4.7-2.1"/>
                    <line className="st4" x1="245.1" y1="158.7" x2="249.9" y2="147.7"/>
				</g>
                <g>
					<path className="st3" d="M247.6,146.4c-1.5-1-2.8-2.3-4-3.8"/>
                    <line className="st4" x1="237.3" y1="153.4" x2="245.5" y2="144.7"/>
				</g>
                <g>
					<path className="st3" d="M243.6,142.6c-0.6-0.8-1.1-1.5-1.7-2.5l-1.9-3"/>
                    <line className="st4" x1="231.8" y1="146.7" x2="241.9" y2="140.2"/>
				</g>
                <g>
					<line className="st3" x1="240" y1="137.2" x2="236.1" y2="131.3"/>
                    <line className="st4" x1="228" y1="140.8" x2="238" y2="134.2"/>
				</g>
                <g>
					<line className="st3" x1="236.1" y1="131.3" x2="232.2" y2="125.4"/>
                    <line className="st4" x1="224.1" y1="134.9" x2="234.1" y2="128.3"/>
				</g>
                <g>
					<line className="st3" x1="232.2" y1="125.4" x2="228.2" y2="119.5"/>
                    <line className="st4" x1="220.2" y1="129.1" x2="230.2" y2="122.4"/>
				</g>
                <g>
					<line className="st3" x1="228.2" y1="119.5" x2="224.2" y2="113.6"/>
                    <line className="st4" x1="216.3" y1="123.3" x2="226.2" y2="116.5"/>
				</g>
                <g>
					<line className="st3" x1="224.2" y1="113.6" x2="220.2" y2="107.8"/>
                    <line className="st4" x1="212.3" y1="117.5" x2="222.2" y2="110.7"/>
				</g>
                <g>
					<line className="st3" x1="220.2" y1="107.8" x2="216.1" y2="102"/>
                    <line className="st4" x1="208.3" y1="111.7" x2="218.2" y2="104.9"/>
				</g>
                <g>
					<line className="st3" x1="216.1" y1="102" x2="212.1" y2="96.2"/>
                    <line className="st4" x1="204.3" y1="106" x2="214.1" y2="99.1"/>
				</g>
                <g>
					<path className="st3" d="M212.1,96.2c-1.3-1.9-2.7-3.8-3.9-5.7"/>
                    <line className="st4" x1="200.2" y1="100.1" x2="210.1" y2="93.3"/>
				</g>
                <g>
					<path className="st3" d="M208.2,90.5c-1.4-2-2.1-3.2-2.6-5"/>
                    <line className="st4" x1="196" y1="93.5" x2="206.6" y2="87.9"/>
				</g>
                <g>
					<path className="st3" d="M205.6,85.5c-0.5-1.7-0.7-3.3-0.7-5.3"/>
                    <line className="st4" x1="193.1" y1="84.4" x2="205.1" y2="83"/>
				</g>
                <g>
					<path className="st3" d="M205,80.2c0-2,0.4-4.5,0.3-7.3"/>
                    <line className="st4" x1="193.2" y1="76.1" x2="205.1" y2="76.8"/>
				</g>
                <g>
					<path className="st3"
                          d="M205.2,72.8c0-1.4-0.2-2.9-0.5-4.4c-0.2-0.7-0.3-1.5-0.6-2.2c-0.2-0.7-0.4-1.4-0.7-2.1"/>
                    <line className="st4" x1="193" y1="70.9" x2="204.7" y2="68.5"/>
				</g>
                <g>
					<path className="st3" d="M203.4,64.2c-1.2-2.8-2.7-5.2-4.5-7.3"/>
                    <line className="st4" x1="191.2" y1="66.6" x2="201.4" y2="60.3"/>
				</g>
                <g>
					<path className="st3" d="M198.9,56.9c-1.8-2.2-3.9-4.1-6.2-5.7"/>
                    <line className="st4" x1="187.9" y1="62.7" x2="196" y2="53.8"/>
				</g>
                <g>
					<path className="st3" d="M192.8,51.2c-2.3-1.6-4.8-2.9-7.5-3.8"/>
                    <line className="st4" x1="183.7" y1="59.7" x2="189.1" y2="49"/>
				</g>
                <g>
					<path className="st3" d="M185.2,47.4c-2.7-0.9-5.6-1.5-8.5-1.5"/>
                    <line className="st4" x1="179" y1="58.1" x2="181.1" y2="46.3"/>
				</g>
                <g>
					<path className="st3" d="M176.8,45.9c-2.9,0-5.9,0.4-8.8,1.5"/>
                    <line className="st4" x1="174.3" y1="58" x2="172.3" y2="46.2"/>
				</g>
                <g>
					<path className="st3" d="M168,47.3c-2.8,1.1-5.4,2.7-7.6,4.7"/>
                    <line className="st4" x1="170.3" y1="59.6" x2="163.9" y2="49.4"/>
				</g>
                <g>
					<path className="st3" d="M160.4,52c-2.2,2-4,4.3-5.4,6.8"/>
                    <line className="st4" x1="166.9" y1="62.6" x2="157.4" y2="55.3"/>
				</g>
                <g>
					<path className="st3" d="M155,58.8c-1.4,2.5-2.4,5.1-3.1,7.9"/>
                    <line className="st4" x1="164.4" y1="67" x2="153.2" y2="62.7"/>
				</g>
                <g>
					<path className="st3" d="M152,66.7c-0.7,2.7-1,5.6-0.8,8.4"/>
                    <line className="st4" x1="163.2" y1="72" x2="151.3" y2="70.8"/>
				</g>
                <g>
					<path className="st3" d="M151.2,75.1c0.1,2.9,0.7,5.8,1.8,8.5"/>
                    <line className="st4" x1="163.4" y1="76.9" x2="151.7" y2="79.4"/>
				</g>
                <g>
					<path className="st3" d="M152.9,83.6c1,2.7,2.5,5.2,4.2,7.4"/>
                    <line className="st4" x1="165.2" y1="81.5" x2="154.8" y2="87.4"/>
				</g>
                <g>
					<path className="st3" d="M157.2,91c1.8,2.2,3.8,4.2,6.1,5.8"/>
                    <line className="st4" x1="168.3" y1="85.4" x2="160" y2="94.1"/>
				</g>
                <g>
					<path className="st3" d="M163.3,96.8c2.3,1.7,4.8,3,7.5,3.9"/>
                    <line className="st4" x1="172.5" y1="88.4" x2="166.9" y2="99"/>
				</g>
                <g>
					<path className="st3" d="M170.8,100.7c2.7,0.9,5.5,1.5,8.4,1.6"/>
                    <line className="st4" x1="177.2" y1="90.1" x2="174.9" y2="101.9"/>
				</g>
                <g>
					<path className="st3" d="M179.2,102.4c1.4,0.1,2.6,0,3.6,0s1.7,0.1,2.2,0.2"/>
                    <line className="st4" x1="183" y1="90.4" x2="182.8" y2="102.4"/>
				</g>
                <g>
					<path className="st3" d="M185,102.6c0.1,0,0.1,0,0.2,0.1l0.1,0.1l0.2,0.1c0.3,0.2,0.7,0.4,1,0.6s0.6,0.5,0.9,0.7
						c0.3,0.2,0.5,0.5,0.7,0.8"/>
                    <line className="st4" x1="193.6" y1="93.8" x2="186.5" y2="103.5"/>
				</g>
                <g>
					<path className="st3" d="M188.1,105c0.2,0.3,0.6,0.7,0.9,1.2c0.3,0.4,0.6,0.9,1,1.4l2,2.8"/>
                    <line className="st4" x1="199.8" y1="100.7" x2="190" y2="107.6"/>
				</g>
                <g>
					<line className="st3" x1="192" y1="110.4" x2="195.9" y2="116.2"/>
                    <line className="st4" x1="203.9" y1="106.6" x2="193.9" y2="113.3"/>
				</g>
                <g>
					<line className="st3" x1="195.9" y1="116.2" x2="199.7" y2="122.1"/>
                    <line className="st4" x1="207.8" y1="112.5" x2="197.8" y2="119.1"/>
				</g>
                <g>
					<line className="st3" x1="199.7" y1="122.1" x2="203.6" y2="128"/>
                    <line className="st4" x1="211.7" y1="118.5" x2="201.7" y2="125"/>
				</g>
                <g>
					<line className="st3" x1="203.6" y1="128" x2="207.4" y2="133.9"/>
                    <line className="st4" x1="215.6" y1="124.4" x2="205.5" y2="130.9"/>
				</g>
                <g>
					<line className="st3" x1="207.4" y1="133.9" x2="211.2" y2="139.8"/>
                    <line className="st4" x1="219.4" y1="130.4" x2="209.3" y2="136.9"/>
				</g>
                <g>
					<line className="st3" x1="211.2" y1="139.8" x2="215" y2="145.8"/>
                    <line className="st4" x1="223.2" y1="136.3" x2="213.1" y2="142.8"/>
				</g>
                <g>
					<line className="st3" x1="215" y1="145.8" x2="218.8" y2="151.7"/>
                    <line className="st4" x1="227" y1="142.3" x2="216.9" y2="148.7"/>
				</g>
                <g>
					<line className="st3" x1="218.8" y1="151.7" x2="222.6" y2="157.7"/>
                    <line className="st4" x1="230.8" y1="148.3" x2="220.7" y2="154.7"/>
				</g>
                <g>
					<line className="st3" x1="222.6" y1="157.7" x2="226.3" y2="163.6"/>
                    <line className="st4" x1="234.6" y1="154.2" x2="224.5" y2="160.6"/>
				</g>
                <g>
					<line className="st3" x1="226.3" y1="163.6" x2="230.1" y2="169.6"/>
                    <line className="st4" x1="238.4" y1="160.2" x2="228.2" y2="166.6"/>
				</g>
                <g>
					<line className="st3" x1="230.1" y1="169.6" x2="233.9" y2="175.6"/>
                    <line className="st4" x1="242.1" y1="166.2" x2="232" y2="172.6"/>
				</g>
                <g>
					<line className="st3" x1="233.9" y1="175.6" x2="237.6" y2="181.5"/>
                    <line className="st4" x1="245.9" y1="172.2" x2="235.8" y2="178.5"/>
				</g>
                <g>
					<path className="st3" d="M237.6,181.5l1.9,3c0.6,1,1.3,2,1.8,2.9"/>
                    <line className="st4" x1="249.7" y1="178.1" x2="239.5" y2="184.5"/>
				</g>
                <g>
					<path className="st3" d="M241.3,187.4c1.1,1.8,2.1,3.8,3,5.8"/>
                    <line className="st4" x1="253.5" y1="184.7" x2="242.9" y2="190.2"/>
				</g>
                <g>
					<path className="st3" d="M244.3,193.2c0.9,2,1.8,4.1,2.6,6.1"/>
                    <line className="st4" x1="256.7" y1="191.7" x2="245.6" y2="196.3"/>
				</g>
                <g>
					<path className="st3" d="M246.9,199.4c0.8,2.1,1.4,4.2,2,6.3"/>
                    <line className="st4" x1="259.4" y1="198.8" x2="247.9" y2="202.5"/>
				</g>
                <g>
					<path className="st3" d="M248.9,205.7c0.6,2.1,1.1,4.3,1.5,6.4"/>
                    <line className="st4" x1="261.4" y1="206.2" x2="249.7" y2="208.9"/>
				</g>
                <g>
					<path className="st3" d="M250.4,212.1c0.4,2.2,0.7,4.3,0.9,6.5"/>
                    <line className="st4" x1="262.8" y1="213.7" x2="250.9" y2="215.4"/>
				</g>
                <g>
					<path className="st3" d="M251.3,218.6c0.2,2.2,0.3,4.4,0.2,6.5"/>
                    <line className="st4" x1="263.5" y1="221.4" x2="251.5" y2="221.9"/>
				</g>
                <g>
					<path className="st3" d="M251.5,225.2c0,2.2-0.2,4.3-0.4,6.5"/>
                    <line className="st4" x1="263.4" y1="229.2" x2="251.4" y2="228.4"/>
				</g>
                <g>
					<path className="st3" d="M251.1,231.6c-0.2,1.1-0.3,2.1-0.5,3.2c-0.2,1.1-0.4,2.1-0.7,3.2"/>
                    <line className="st4" x1="262.4" y1="237" x2="250.6" y2="234.8"/>
				</g>
                <g>
					<path className="st3" d="M249.9,238c-0.3,1-0.5,2.1-0.9,3.1l-0.5,1.5l-0.6,1.5"/>
                    <line className="st4" x1="260.5" y1="244.7" x2="249" y2="241.1"/>
				</g>
                <g>
					<path className="st3" d="M248,244.2c-0.4,1-0.8,2-1.2,3c-0.4,1-0.9,1.9-1.4,2.9"/>
                    <line className="st4" x1="257.7" y1="252" x2="246.8" y2="247.1"/>
				</g>
                <g>
					<path className="st3" d="M245.4,250c-0.5,1-1.1,1.9-1.6,2.8c-0.5,0.9-1.2,1.8-1.7,2.7"/>
                    <line className="st4" x1="254.1" y1="259" x2="243.8" y2="252.9"/>
				</g>
                <g>
					<path className="st3" d="M242.1,255.6c-1.2,1.8-2.5,3.5-4,5.1"/>
                    <line className="st4" x1="249.6" y1="265.5" x2="240.2" y2="258.2"/>
				</g>
                <g>
					<path className="st3" d="M238.1,260.7c-1.4,1.6-2.9,3.2-4.5,4.7"/>
                    <line className="st4" x1="244.5" y1="271.4" x2="235.9" y2="263.1"/>
				</g>
                <g>
					<path className="st3" d="M233.6,265.4c-1.6,1.5-3.3,2.9-5,4.3"/>
                    <line className="st4" x1="238.9" y1="276.7" x2="231.1" y2="267.6"/>
				</g>
                <g>
					<path className="st3" d="M228.5,269.6c-1.7,1.4-3.6,2.6-5.5,3.9"/>
                    <line className="st4" x1="232.8" y1="281.4" x2="225.9" y2="271.6"/>
				</g>
                <g>
					<line className="st3" x1="223.1" y1="273.5" x2="217.2" y2="277.4"/>
                    <line className="st4" x1="226.7" y1="285.5" x2="220.2" y2="275.4"/>
				</g>
                <g>
					<line className="st3" x1="217.2" y1="277.4" x2="211.3" y2="281.3"/>
                    <line className="st4" x1="220.8" y1="289.3" x2="214.2" y2="279.3"/>
				</g>
                <g>
					<line className="st3" x1="211.3" y1="281.3" x2="205.4" y2="285.2"/>
                    <line className="st4" x1="215" y1="293.2" x2="208.3" y2="283.2"/>
				</g>
                <g>
					<line className="st3" x1="205.4" y1="285.2" x2="199.5" y2="289.1"/>
                    <line className="st4" x1="209.1" y1="297.1" x2="202.4" y2="287.1"/>
				</g>
                <g>
					<line className="st3" x1="199.5" y1="289.1" x2="193.6" y2="293.1"/>
                    <line className="st4" x1="203.3" y1="301" x2="196.6" y2="291.1"/>
				</g>
                <g>
					<line className="st3" x1="193.6" y1="293.1" x2="187.8" y2="297.1"/>
                    <line className="st4" x1="197.5" y1="305" x2="190.7" y2="295.1"/>
				</g>
                <g>
					<line className="st3" x1="187.8" y1="297.1" x2="182" y2="301.1"/>
                    <line className="st4" x1="191.7" y1="309" x2="184.9" y2="299.1"/>
				</g>
                <g>
					<line className="st3" x1="182" y1="301.1" x2="176.1" y2="305.1"/>
                    <line className="st4" x1="185.9" y1="313" x2="179" y2="303.1"/>
				</g>
                <g>
					<line className="st3" x1="176.2" y1="305.1" x2="170.3" y2="309.2"/>
                    <line className="st4" x1="180.1" y1="317" x2="173.2" y2="307.1"/>
				</g>
                <g>
					<line className="st3" x1="170.3" y1="309.2" x2="164.6" y2="313.2"/>
                    <line className="st4" x1="174.3" y1="321" x2="167.4" y2="311.2"/>
				</g>
                <g>
					<line className="st3" x1="164.6" y1="313.2" x2="158.8" y2="317.3"/>
                    <line className="st4" x1="168.6" y1="325.1" x2="161.7" y2="315.2"/>
				</g>
                <g>
					<line className="st3" x1="158.8" y1="317.3" x2="153" y2="321.4"/>
                    <line className="st4" x1="162.8" y1="329.1" x2="155.9" y2="319.3"/>
				</g>
                <g>
					<line className="st3" x1="153" y1="321.4" x2="147.2" y2="325.4"/>
                    <line className="st4" x1="157.1" y1="333.2" x2="150.1" y2="323.4"/>
				</g>
                <g>
					<line className="st3" x1="147.2" y1="325.4" x2="141.5" y2="329.5"/>
                    <line className="st4" x1="151.3" y1="337.3" x2="144.3" y2="327.5"/>
				</g>
                <g>
					<line className="st3" x1="141.5" y1="329.5" x2="135.7" y2="333.6"/>
                    <line className="st4" x1="145.6" y1="341.4" x2="138.6" y2="331.6"/>
				</g>
                <g>
					<line className="st3" x1="135.7" y1="333.6" x2="130" y2="337.8"/>
                    <line className="st4" x1="139.8" y1="345.5" x2="132.8" y2="335.7"/>
				</g>
                <g>
					<line className="st3" x1="130" y1="337.8" x2="124.2" y2="341.9"/>
                    <line className="st4" x1="134.1" y1="349.6" x2="127.1" y2="339.8"/>
				</g>
                <g>
					<line className="st3" x1="124.2" y1="341.9" x2="118.5" y2="346"/>
                    <line className="st4" x1="128.4" y1="353.7" x2="121.4" y2="343.9"/>
				</g>
                <g>
					<line className="st3" x1="118.5" y1="346" x2="112.8" y2="350.1"/>
                    <line className="st4" x1="122.7" y1="357.8" x2="115.6" y2="348.1"/>
				</g>
                <g>
					<line className="st3" x1="112.8" y1="350.1" x2="107.1" y2="354.3"/>
                    <line className="st4" x1="116.9" y1="361.9" x2="109.9" y2="352.2"/>
				</g>
                <g>
					<line className="st3" x1="107.1" y1="354.3" x2="101.4" y2="358.4"/>
                    <line className="st4" x1="111.2" y1="366.1" x2="104.2" y2="356.3"/>
				</g>
                <g>
					<path className="st3"
                          d="M101.4,358.4l-1.4,1c-0.2,0.2-0.3,0.2-0.5,0.3s-0.4,0.3-0.6,0.4c-0.8,0.5-1.7,0.9-2.5,1.3"/>
                    <line className="st4" x1="104.8" y1="370.5" x2="98.8" y2="360.1"/>
				</g>
                <g>
					<path className="st3" d="M96.3,361.4c-1.7,0.7-3.5,1.1-5.3,1.2"/>
                    <line className="st4" x1="96.4" y1="373.9" x2="93.7" y2="362.2"/>
				</g>
                <g>
					<path className="st3" d="M91,362.6c-0.9,0.1-1.7,0-2.6-0.1c-0.9-0.1-1.7-0.3-3.1-0.6"/>
                    <line className="st4" x1="87" y1="374.4" x2="88.5" y2="362.5"/>
				</g>
                <g>
					<path className="st3" d="M85.4,361.9c-0.7-0.2-1.6-0.3-2.4-0.3c-0.4,0-0.8-0.1-1.2-0.1l-1.2,0.1c-0.8,0-1.5,0.1-2.3,0.2
						c-0.8,0.1-1.5,0.3-2.2,0.5"/>
                    <line className="st4" x1="81.2" y1="373.6" x2="80.6" y2="361.6"/>
				</g>
                <g>
					<path className="st3" d="M76.1,362.3c-2.8,0.7-5.4,1.9-7.8,3.3"/>
                    <line className="st4" x1="76.8" y1="374.7" x2="72.1" y2="363.7"/>
				</g>
                <g>
					<path className="st3" d="M68.3,365.6c-2.4,1.4-4.6,3.2-6.6,5.1"/>
                    <line className="st4" x1="72.3" y1="377.4" x2="64.9" y2="368"/>
				</g>
                <g>
					<path className="st3" d="M61.8,370.7c-2,1.9-3.7,4.3-5.1,6.7"/>
                    <line className="st4" x1="68.6" y1="381.1" x2="59" y2="373.9"/>
				</g>
                <g>
					<path className="st3" d="M56.7,377.4c-1.4,2.4-2.4,5.2-3.1,7.9"/>
                    <line className="st4" x1="66.1" y1="385.6" x2="54.9" y2="381.3"/>
				</g>
                <g>
					<path className="st3" d="M53.6,385.3c-0.7,2.8-0.8,5.7-0.6,8.5"/>
                    <line className="st4" x1="65" y1="390.5" x2="53" y2="389.6"/>
				</g>
                <g>
					<path className="st3" d="M53,393.8c0.2,2.8,0.7,5.6,1.6,8.2"/>
                    <line className="st4" x1="65.3" y1="395.6" x2="53.6" y2="398"/>
				</g>
                <g>
					<path className="st3" d="M54.7,402c0.9,2.6,2.1,5.1,3.7,7.5"/>
                    <line className="st4" x1="67" y1="400.6" x2="56.3" y2="405.9"/>
				</g>
                <g>
					<path className="st3" d="M58.3,409.5c1.5,2.3,3.4,4.5,5.5,6.3"/>
                    <line className="st4" x1="69.9" y1="405" x2="60.8" y2="412.8"/>
				</g>
                <g>
					<path className="st3" d="M63.8,415.8c2.1,1.9,4.5,3.5,7,4.7"/>
                    <line className="st4" x1="73.8" y1="408.4" x2="67.1" y2="418.4"/>
				</g>
                <g>
					<path className="st3" d="M70.8,420.5c2.6,1.2,5.3,2,8,2.5"/>
                    <line className="st4" x1="78.4" y1="410.6" x2="74.8" y2="422"/>
				</g>
                <g>
					<path className="st3" d="M78.8,423c2.7,0.5,5.5,0.6,8.3,0.4"/>
                    <line className="st4" x1="83.5" y1="411.5" x2="83" y2="423.5"/>
				</g>
                <g>
					<path className="st3" d="M87.1,423.4c2.7-0.2,5.5-0.7,8.1-1.6"/>
                    <line className="st4" x1="88.9" y1="411.1" x2="91.2" y2="422.9"/>
				</g>
                <g>
					<path className="st3" d="M95.2,421.8c2.6-0.9,5.2-2,7.5-3.5"/>
                    <line className="st4" x1="94" y1="409.5" x2="99.1" y2="420.3"/>
				</g>
                <g>
					<path className="st3" d="M102.7,418.3l1.7-1.2c0.6-0.4,1.1-0.9,1.6-1.3c1.1-0.9,2.1-1.8,3-2.9"/>
                    <line className="st4" x1="98.4" y1="406.7" x2="106.1" y2="415.8"/>
				</g>
                <g>
					<path className="st3" d="M109.2,412.9c1.9-2.1,3.7-4.9,4.6-7.9"/>
                    <line className="st4" x1="101.5" y1="403.1" x2="111.8" y2="409.3"/>
				</g>
                <g>
					<path className="st3" d="M113.8,405c0.5-1.5,0.8-3,0.9-4.5c0.1-1.2,0.2-2.4,0.3-3.6"/>
                    <line className="st4" x1="102.7" y1="399.3" x2="114.7" y2="400.5"/>
				</g>
                <g>
					<path className="st3" d="M115,396.9c0.1-1.2,0.2-2.4,0.2-3.7l0.1-1.9c0-0.3,0-0.7,0-1.1v-0.7"/>
                    <line className="st4" x1="103.2" y1="392.6" x2="115.2" y2="393.2"/>
				</g>
                <g>
					<path className="st3" d="M115.3,389.5c0-1.9,0.3-3.9,0.8-5.8"/>
                    <line className="st4" x1="103.6" y1="385" x2="115.5" y2="386.6"/>
				</g>
                <g>
					<path className="st3" d="M116.1,383.7c0.2-1,0.5-2,0.9-3c0.2-0.5,0.3-1,0.5-1.5l0.3-0.8"/>
                    <line className="st4" x1="105.5" y1="376.9" x2="116.9" y2="380.7"/>
				</g>
                <g>
					<path className="st3" d="M117.8,378.4c0-0.2,0.2-0.3,0.3-0.4l0.9-0.8l2.7-2.2"/>
                    <line className="st4" x1="111.4" y1="367.9" x2="119" y2="377.3"/>
				</g>
                <g>
					<line className="st3" x1="121.7" y1="375" x2="127.2" y2="370.6"/>
                    <line className="st4" x1="116.9" y1="363.5" x2="124.5" y2="372.8"/>
				</g>
                <g>
					<line className="st3" x1="127.2" y1="370.6" x2="132.7" y2="366.1"/>
                    <line className="st4" x1="122.4" y1="359" x2="130" y2="368.4"/>
				</g>
                <g>
					<line className="st3" x1="132.7" y1="366.1" x2="138.2" y2="361.7"/>
                    <line className="st4" x1="127.9" y1="354.6" x2="135.4" y2="363.9"/>
				</g>
                <g>
					<line className="st3" x1="138.2" y1="361.7" x2="143.7" y2="357.3"/>
                    <line className="st4" x1="133.4" y1="350.2" x2="140.9" y2="359.5"/>
				</g>
                <g>
					<line className="st3" x1="143.7" y1="357.3" x2="149.2" y2="352.8"/>
                    <line className="st4" x1="138.9" y1="345.7" x2="146.4" y2="355"/>
				</g>
                <g>
					<path className="st3" d="M149.2,352.8l2.7-2.2l0.1-0.1l0.2-0.1c0.3-0.2,0.6-0.4,0.8-0.6l1.5-1.1"/>
                    <line className="st4" x1="144.3" y1="341.3" x2="151.9" y2="350.6"/>
				</g>
                <g>
					<line className="st3" x1="154.6" y1="348.8" x2="160.3" y2="344.6"/>
                    <line className="st4" x1="150.4" y1="337" x2="157.4" y2="346.6"/>
				</g>
                <g>
					<path className="st3" d="M160.3,344.6c1.9-1.4,3.8-2.7,5.7-4"/>
                    <line className="st4" x1="156.2" y1="332.8" x2="163.1" y2="342.6"/>
				</g>
                <g>
					<path className="st3" d="M165.9,340.6c1.9-1.3,3.8-2.6,5.7-3.8"/>
                    <line className="st4" x1="162.1" y1="328.6" x2="168.8" y2="338.6"/>
				</g>
                <g>
					<path className="st3" d="M171.7,336.7c1.9-1.3,3.9-2.4,5.8-3.6"/>
                    <line className="st4" x1="168.3" y1="324.7" x2="174.6" y2="334.9"/>
				</g>
                <g>
					<path className="st3" d="M177.5,333.1c1-0.5,2-1.2,2.9-1.6c1-0.5,1.9-1,2.9-1.4"/>
                    <line className="st4" x1="174.7" y1="320.9" x2="180.4" y2="331.5"/>
				</g>
                <g>
					<path className="st3" d="M183.3,330.1c1-0.4,1.9-0.9,2.9-1.2c0.5-0.2,1-0.4,1.5-0.6l1.5-0.5"/>
                    <line className="st4" x1="182" y1="317.6" x2="186.2" y2="328.9"/>
				</g>
                <g>
					<path className="st3" d="M189.3,327.8c1-0.4,2.1-0.6,3.1-0.8c1-0.2,2.1-0.5,3.2-0.6"/>
                    <line className="st4" x1="189.6" y1="315.3" x2="192.3" y2="327"/>
				</g>
                <g>
					<path className="st3" d="M195.5,326.3c2.1-0.4,4.3-0.6,6.5-0.8"/>
                    <line className="st4" x1="197.3" y1="313.9" x2="198.7" y2="325.9"/>
				</g>
                <g>
					<path className="st3" d="M202,325.5c2.2-0.1,4.4-0.2,6.6-0.1"/>
                    <line className="st4" x1="205" y1="313.4" x2="205.3" y2="325.4"/>
				</g>
                <g>
					<path className="st3" d="M208.6,325.4c2.2,0,4.5,0.2,6.9,0.3"/>
                    <line className="st4" x1="212.6" y1="313.6" x2="212" y2="325.5"/>
				</g>
			</g>
		</g>
	</g>
</g>
        <text transform="matrix(1 0 0 1 253.9385 198.8576)" className="st5 st7">{reverse(dnaComplement(spacer).compSeq)}</text>
        <path id="Line_2_" className="st9" d="M478.1,198.3"/>
        <path className="st9" d="M478.1,237.9"/>
        <g>
	<path d="M77.8,256.3"/>
            <path d="M77.8,180.3"/>
            <text transform="matrix(1 0 0 1 69.1657 189.8603)" className="st5 st6">5&apos;</text>
            <text transform="matrix(1 0 0 1 70.3651 261.527)" className="st5 st6">3&apos;</text>
            <line className="st8" x1="56.8" y1="241.3" x2="248.8" y2="240.3"/>
            <path id="Line_1_" className="st9" d="M56.8,240.6"/>
            <path className="st9" d="M56.8,201"/>
            <line className="st8" x1="55.8" y1="201.8" x2="247.8" y2="200.8"/>
            <g>
		<line className="st8" x1="72.8" y1="207.8" x2="72.8" y2="231.8"/>
                <line className="st8" x1="237.8" y1="207.8" x2="237.8" y2="231.8"/>
                <line className="st8" x1="211.3" y1="207.8" x2="211.3" y2="231.8"/>
                <line className="st8" x1="89.3" y1="207.8" x2="89.3" y2="231.8"/>
                <line className="st8" x1="105.8" y1="207.8" x2="105.8" y2="231.8"/>
                <line className="st8" x1="124.3" y1="207.8" x2="124.3" y2="231.8"/>
                <line className="st8" x1="184.3" y1="207.8" x2="184.3" y2="231.8"/>
                <line className="st8" x1="140.8" y1="207.8" x2="140.8" y2="231.8"/>
                <line className="st8" x1="167.8" y1="207.8" x2="167.8" y2="231.8"/>
                <line className="st8" x1="80.4" y1="207.8" x2="80.4" y2="231.8"/>
                <line className="st8" x1="158.9" y1="207.8" x2="158.9" y2="231.8"/>
                <line className="st8" x1="245.9" y1="207.8" x2="245.9" y2="231.8"/>
                <line className="st8" x1="229.4" y1="207.8" x2="229.4" y2="231.8"/>
                <line className="st8" x1="219.9" y1="207.8" x2="219.9" y2="231.8"/>
                <line className="st8" x1="96.9" y1="207.8" x2="96.9" y2="231.8"/>
                <line className="st8" x1="115.4" y1="207.8" x2="115.4" y2="231.8"/>
                <line className="st8" x1="202.4" y1="207.8" x2="202.4" y2="231.8"/>
                <line className="st8" x1="131.9" y1="207.8" x2="131.9" y2="231.8"/>
                <line className="st8" x1="193.9" y1="207.8" x2="193.9" y2="231.8"/>
                <line className="st8" x1="149.4" y1="207.8" x2="149.4" y2="231.8"/>
                <line className="st8" x1="176.4" y1="207.8" x2="176.4" y2="231.8"/>
	</g>
</g>
        <path id="Line_10_" d="M287.7,237.5"/>
        <path id="Line_9_" d="M479.7,237.5"/>
        <path d="M287.7,277.1"/>
        <path d="M479.7,277.1"/>
        <path id="Line_8_" d="M186.3,237.6"/>
        <g>
	<line className="st10" x1="189.1" y1="228.4" x2="189.1" y2="216.1"/>
            <line className="st10" x1="203.6" y1="228.4" x2="203.6" y2="216.1"/>
            <line className="st10" x1="218.1" y1="228.4" x2="218.1" y2="216.1"/>
</g>
        <text transform="matrix(1 0 0 1 252.3311 156.298)" className="st11 st12 st7">{reverse(spacer.replaceAll('T', 'U'))}</text>
        <text transform="matrix(0.866 0.5 -0.5 0.866 215.4339 331.7481)" className="st11 st12 st7">{first5}</text>
        <text transform="matrix(0.866 0.5 -0.5 0.866 253.182 247.7062)" className="st5 st7">{reverse(spacer.substring(spacerLength-3, spacerLength))}</text>
        <g>
	<path d="M617,255.3"/>
            <path d="M617,179.3"/>
            <text transform="matrix(1 0 0 1 615.4731 188.9085)" className="st5 st6">3&apos;</text>
            <text transform="matrix(1 0 0 1 615.4731 260.5741)" className="st5 st6">5&apos;</text>
            <g>
		<line className="st8" x1="478" y1="240.3" x2="670" y2="239.3"/>
                <path id="Line_4_" className="st9" d="M670.5,239.7"/>
                <path id="Line_3_" className="st9" d="M478.6,239.7"/>
                <path className="st9" d="M670.5,200.1"/>
                <path className="st9" d="M478.6,200.1"/>
                <line className="st8" x1="477.6" y1="200.8" x2="669.6" y2="199.8"/>
	</g>
            <g>
		<line className="st8" x1="483" y1="207.8" x2="483" y2="231.8"/>
                <line className="st8" x1="648" y1="207.8" x2="648" y2="231.8"/>
                <line className="st8" x1="621.5" y1="207.8" x2="621.5" y2="231.8"/>
                <line className="st8" x1="499.5" y1="207.8" x2="499.5" y2="231.8"/>
                <line className="st8" x1="516" y1="207.8" x2="516" y2="231.8"/>
                <line className="st8" x1="534.5" y1="207.8" x2="534.5" y2="231.8"/>
                <line className="st8" x1="594.5" y1="207.8" x2="594.5" y2="231.8"/>
                <line className="st8" x1="551" y1="207.8" x2="551" y2="231.8"/>
                <line className="st8" x1="578" y1="207.8" x2="578" y2="231.8"/>
                <line className="st8" x1="490.7" y1="207.8" x2="490.7" y2="231.8"/>
                <line className="st8" x1="569.2" y1="207.8" x2="569.2" y2="231.8"/>
                <line className="st8" x1="656.2" y1="207.8" x2="656.2" y2="231.8"/>
                <line className="st8" x1="639.7" y1="207.8" x2="639.7" y2="231.8"/>
                <line className="st8" x1="630.2" y1="207.8" x2="630.2" y2="231.8"/>
                <line className="st8" x1="507.2" y1="207.8" x2="507.2" y2="231.8"/>
                <line className="st8" x1="525.7" y1="207.8" x2="525.7" y2="231.8"/>
                <line className="st8" x1="612.7" y1="207.8" x2="612.7" y2="231.8"/>
                <line className="st8" x1="542.2" y1="207.8" x2="542.2" y2="231.8"/>
                <line className="st8" x1="604.2" y1="207.8" x2="604.2" y2="231.8"/>
                <line className="st8" x1="559.7" y1="207.8" x2="559.7" y2="231.8"/>
                <line className="st8" x1="586.7" y1="207.8" x2="586.7" y2="231.8"/>
	</g>
</g>
        <g>
	<text transform="matrix(0.866 -0.5 0.5 0.866 321.33 332.5125)" className="st5 st7">{reverse(spacer.substring(0, spacerLength-3))}</text>
            <text transform="matrix(0.866 -0.5 0.5 0.866 345.5946 368.1297)" className="st11 st12 st7">{pbs}</text>
            <g>
                {pbsLength > 16 && <line className="st8" x1="477.9" y1="248.9" x2="489.9" y2="269.7"/>}
                {pbsLength > 15 && <line className="st8" x1="469.6" y1="253.7" x2="481.6" y2="274.4"/>}
                {pbsLength > 14 && <line className="st8" x1="461" y1="258.6" x2="473" y2="279.4"/>}
                {pbsLength > 13 && <line className="st8" x1="451.3" y1="264.2" x2="463.3" y2="285"/>}
                {pbsLength > 12 && <line className="st8" x1="442.6" y1="269.3" x2="454.6" y2="290.1"/>}
                {pbsLength > 11 && <line className="st8" x1="433.5" y1="274.5" x2="445.5" y2="295.3"/>}
                {pbsLength > 10 && <line className="st8" x1="424.8" y1="279.5" x2="436.8" y2="300.3"/>}
                {pbsLength > 9 && <line className="st8" x1="415" y1="285.2" x2="427" y2="306"/>}
                {pbsLength > 8 && <line className="st8" x1="407" y1="289.8" x2="419" y2="310.6"/>}
                {pbsLength > 7 && <line className="st8" x1="398.2" y1="294.9" x2="410.2" y2="315.7"/>}
                {pbsLength > 6 && <line className="st8" x1="389.1" y1="300.1" x2="401.1" y2="320.9"/>}
                {pbsLength > 5 && <line className="st8" x1="379.4" y1="305.7" x2="391.4" y2="326.5"/>}
                {pbsLength > 4 && <line className="st8" x1="370.6" y1="310.8" x2="382.6" y2="331.6"/>}
                {pbsLength > 3 && <line className="st8" x1="361.6" y1="316" x2="373.6" y2="336.8"/>}
                {pbsLength > 2 && <line className="st8" x1="353.8" y1="320.5" x2="365.8" y2="341.3"/>}
                {pbsLength > 1 && <line className="st8" x1="344.7" y1="325.8" x2="356.7" y2="346.5"/>}
                {pbsLength > 0 && <line className="st8" x1="334.9" y1="331.4" x2="346.9" y2="352.2"/>}
	</g>
</g>
        <text transform="matrix(1 0 0 1 285.1099 365.0117)" className="st11 st12 st7">{last5}</text>
        <text transform="matrix(1 0 0 1 259.437 419.9679)" className="st11 st12 st7">
            <tspan x={-(loopfirst.length-5)*3+5*(flip.length-2)} y={-(5-loopfirst.length)*11}>
                {reverse(flip)}
            </tspan>
        </text>
        <text transform="matrix(0.2588 -0.9659 0.9659 0.2588 276.8433 418.2174)" className="st11 st12 st7">
            <tspan x={(6-loopfirst.length)*11}>{looplast}</tspan>
        </text>
        <text transform="matrix(-0.2588 0.9659 -0.9659 -0.2588 262.5258 357.9525)" className="st11 st12 st7">{loopfirst}</text>
        <g>
	<line className="st8" x1="467.1" y1="188.6" x2="467.1" y2="164.6"/>
            <line className="st8" x1="266.5" y1="188.6" x2="266.5" y2="164.6"/>
            <line className="st8" x1="298.7" y1="188.6" x2="298.7" y2="164.6"/>
            <line className="st8" x1="447" y1="188.6" x2="447" y2="164.6"/>
            <line className="st8" x1="426.9" y1="188.6" x2="426.9" y2="164.6"/>
            <line className="st8" x1="404.4" y1="188.6" x2="404.4" y2="164.6"/>
            <line className="st8" x1="331.5" y1="188.6" x2="331.5" y2="164.6"/>
            <line className="st8" x1="384.4" y1="188.6" x2="384.4" y2="164.6"/>
            <line className="st8" x1="351.6" y1="188.6" x2="351.6" y2="164.6"/>
            <line className="st8" x1="457.8" y1="188.6" x2="457.8" y2="164.6"/>
            <line className="st8" x1="362.4" y1="188.6" x2="362.4" y2="164.6"/>
            <line className="st8" x1="256.6" y1="188.6" x2="256.6" y2="164.6"/>
            <line className="st8" x1="276.7" y1="188.6" x2="276.7" y2="164.6"/>
            <line className="st8" x1="288.2" y1="188.6" x2="288.2" y2="164.6"/>
            <line className="st8" x1="437.7" y1="188.6" x2="437.7" y2="164.6"/>
            <line className="st8" x1="415.3" y1="188.6" x2="415.3" y2="164.6"/>
            <line className="st8" x1="309.5" y1="188.6" x2="309.5" y2="164.6"/>
            <line className="st8" x1="395.2" y1="188.6" x2="395.2" y2="164.6"/>
            <line className="st8" x1="319.8" y1="188.6" x2="319.8" y2="164.6"/>
            <line className="st8" x1="373.9" y1="188.6" x2="373.9" y2="164.6"/>
            <line className="st8" x1="341.1" y1="188.6" x2="341.1" y2="164.6"/>
</g>
<text transform="matrix(1 0 0 1 469.739 142.2802)" className="st6 st11 st12">5&apos;</text>
    </svg>

}