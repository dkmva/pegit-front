import * as React from "react";

import { borderColorByIndex, colorByIndex } from "../../../utils/colors";
import randomid from "../../../utils/randomid";

export default class TranslationRows extends React.PureComponent {
  render() {
    const {
      translations,
      yDiff,
      inputRef,
      seqBlockRef,
      onUnmount,
      fullSeq,
      firstBase,
      lastBase,
      bpsPerBlock,
      charWidth,
      findXAndWidth,
      elementHeight
    } = this.props;

    return (
      <g className="la-vz-linear-translations">
        {translations.map((t, i) => (
          <TranslationRow
            translation={t}
            y={yDiff + elementHeight * i - 10}
            height={elementHeight}
            key={`${t.id}-${firstBase}`}
            id={t.id}
            inputRef={inputRef}
            seqBlockRef={seqBlockRef}
            onUnmount={onUnmount}
            fullSeq={fullSeq}
            firstBase={firstBase}
            lastBase={lastBase}
            charWidth={charWidth}
            bpsPerBlock={bpsPerBlock}
            findXAndWidth={findXAndWidth}
          />
        ))}
      </g>
    );
  }
}

/**
 * TranslationRow
 *
 * a single translation row
 *
 * a row for translations of DNA into Amino Acid sequences so a user can
 * see the resulting protein or peptide sequence within in the viewer
 *
 * chose here to have the row itself, with the pull part seq as a reference
 * cut up the sequence into the dna associated with the current row and
 * translate
 */
class TranslationRow extends React.Component {
  static textProps = {
    dominantBaseline: "middle",
    cursor: "pointer",
    textAnchor: "middle",
    style: {
      color: "black",
      fontSize: 13,
      fontWeight: 400
    }
  };
  static textProps2 = {
    dominantBaseline: "middle",
    cursor: "pointer",
    textAnchor: "middle",
    style: {
      color: "black",
      fontSize: 10,
      fontWeight: 400
    }
  };

  static aaProps = {
    shapeRendering: "geometricPrecision",
    style: {
      cursor: "pointer",
      strokeWidth: 0.8,
      opacity: 0.7
    }
  };

  AAs = [];

  componentWillUnmount = () => {
    const { onUnmount } = this.props;
    this.AAs.forEach(a => {
      onUnmount(a);
    });
  }; // clear all AA references

  /**
   * make the actual path string
   *
   * c = base pair count
   * m = multiplier (FWD or REV)
   */
  genPath = (count, multiplier) => {
    const { height: h, charWidth } = this.props; // width adjust
    const nW = count * charWidth;
    const wA = multiplier * 3;
    return `M 0 0
			L ${nW} 0
			L ${nW + wA} ${h / 2}
			L ${nW} ${h}
			L 0 ${h}
			L ${wA} ${h / 2}
			Z`;
  };

  render() {
    const {
      inputRef,
      seqBlockRef: element,
      translation,
      fullSeq,
      findXAndWidth,
      y,
      charWidth,
      bpsPerBlock
    } = this.props;

    let { firstBase, lastBase, height: h } = this.props;

    const { id, AAseq, direction, offset, firstAAIndex } = translation;
    let { end } = translation;

    let { start } = translation;
    if (start < 0) {
      //end -= start -2;
      start -= start - (start % 3 + 3) % 3;
    }
    const refStart = Math.max(0, start);
    lastBase = Math.min(lastBase, end);
    firstBase = Math.max(firstBase, start);

    if (offset > 0) {
      start += offset - 3;
    }

    // build up a reference to this whole translation for
    // selection handler (used only for context clicking right now)
    const type = "TRANSLATION";
    let ref = { start: refStart, end, type, element };
    // substring and split only the amino acids that are relevant to this
    // particular sequence block
    const AAs = AAseq.split("");
    return (
      <g transform={`translate(0, ${y})`} ref={inputRef(id, ref)} id={id}>
        {AAs.map((a, i) => {
          // generate and store an id reference (that's used for selection)
          const aaId = randomid();
          this.AAs.push(aaId);

          // calculate the start and end point of each amino acid
          // modulo needed here for translations that cross zero index
          let AAStart = (start + i * 3) % fullSeq.length;
          let AAEnd = (start + i * 3 + 3) % fullSeq.length;

          if (AAStart > AAEnd && firstBase >= bpsPerBlock) {
            // amino acid has crossed zero index in the last SeqBlock
            AAEnd += fullSeq.length;
          } else if (AAStart > AAEnd && firstBase < bpsPerBlock) {
            // amino acid has crossed zero index in the first SeqBlock
            AAStart -= fullSeq.length;
          } else if (AAStart === 0 && firstBase >= bpsPerBlock) {
            // extreme edge case (1/3 around zero) where modulo returns zero
            AAStart += fullSeq.length;
            AAEnd += fullSeq.length;
          }

          // build up a selection handler reference for just this amino acid,
          // so a singly translated amino acid can be selected from within the
          // larger translation

          // the amino acid doesn't fit within this SeqBlock (even partially)
          if (AAStart > lastBase || AAEnd < firstBase) return null;

          let textShow = true; // whether to show amino acids abbreviation
          let bpCount = 3; // start off assuming the full thing is shown
          if (AAStart < firstBase) {
            bpCount = Math.min(3, AAEnd - firstBase);
            if (bpCount < 2) {
              // w/ one bp, the amino acid is probably too small for an abbreviation
              textShow = false;
            }
          } else if (AAEnd > lastBase) {
            bpCount = Math.min(3, lastBase - AAStart);
            if (bpCount < 2) {
              textShow = false;
            }
          }

          const { x } = findXAndWidth(Math.max(AAStart, firstBase));

          // direction check needed to determine which direction the amino acid translation
          // arrow are facing
          const path = this.genPath(bpCount, direction === 1 ? 1 : -1);

          return (
            <g
              key={aaId}
              id={aaId}
              transform={`translate(${x}, 0)`}
              ref={inputRef(aaId, ref)}
            >
              <path
                id={aaId}
                d={path}
                {...TranslationRow.aaProps}
                fill={colorByIndex(a.charCodeAt(0))}
                stroke={borderColorByIndex(a.charCodeAt(0))}
              />
              {textShow && (i + firstAAIndex + 1) % 10 && (
                <text
                  id={aaId}
                  x={charWidth * 1.5}
                  y={`${h / 2 + 1.5}`}
                  {...TranslationRow.textProps}
                >
                  {a}
                </text>
              )}
              {textShow && !((i + firstAAIndex + 1) % 10) && (
                <>
                  <text
                    id={aaId}
                    x={charWidth * 1.5}
                    y={`${h / 2 - 4.5}`}
                    {...TranslationRow.textProps2}
                  >
                    {a}
                  </text>
                  <text
                    id={aaId}
                    x={charWidth * 1.5}
                    y={`${h / 2 + 4.5}`}
                    {...TranslationRow.textProps2}
                  >
                    {i + firstAAIndex + 1}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </g>
    );
  }
}
