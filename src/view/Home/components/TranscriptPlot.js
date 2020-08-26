import React from 'react';
import { FlexibleWidthXYPlot, LineSeries, CustomSVGSeries } from "react-vis";


const TranscriptPlot = (props) => {
    let { gene, transcript } = props;

    let offset = 0;

    let data = [
      {x: offset, y: 50 },
      {x: 1500, y: 50},
    ];


    const geneLength = gene.end - gene.start;

    let exonData = transcript.exons.map((exon) => {
        const exonStart = (exon.start - gene.start) / geneLength * 1000 + offset;
        const exonEnd = (exon.end - gene.start) / geneLength * 1000 + offset;
        return {
            x: exonStart,
            y: 100,
            customComponent: (row, positionInPixels, globalStyle) => (
                <g id="Exon 1" transform="translate(0, 0)">
                    <path id="Exon 1" className="Exon 1" shapeRendering="geometricPrecision" d={`M 0 0 L ${(exonEnd-exonStart)*.45} 0 L ${(exonEnd-exonStart)*.5} 5 L ${(exonEnd-exonStart)*.45} 10 L 0 10 L 0 0`}
                          style={{fillOpacity: 1, cursor: "pointer", fill: "rgb(107, 129, 255)", stroke: "rgb(46, 59, 133)", strokeWidth: "0.5px"}}></path>
                </g>
            )
        }
        }
    );


   return <FlexibleWidthXYPlot height={55}>
       <LineSeries key={transcript.name + 'line'} data={data} strokeStyle='dashed' color='grey'/>
       <CustomSVGSeries data={exonData}/>
   </FlexibleWidthXYPlot>;
}

export default TranscriptPlot;
