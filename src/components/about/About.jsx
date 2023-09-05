import React, { useState } from 'react'
import './aboutStyles.css'
import { sections } from './sections'

function About() {

  const DataPoint = (props) => {
    let topic = (sections.find(c => c.section === props.sectionNumber)).topic;
    let data = (sections.find(c => c.section === props.sectionNumber)).data;
   return (
    <div style={{ padding: '1em'}}>
      <div style={{ paddingBottom: '.25em', fontSize: '1.2rem', fontWeight: '600'}}>{topic}</div>
      {data.map((point, index) => (
          <div key={index} style={{ padding: `${props.padding}`, fontSize: '1rem' }} >
            {props.bullet && <span style={{ fontSize: '1rem' }}>- </span>}
            <span style={{ fontSize: '1rem' }}>{(point == 'Github code') ? <a  style={{ fontSize: '1rem' }} href="https://github.com/nguyenterprises/PurpleSky/tree/master">{point}</a>  : point}</span>
          </div> 
      ))}
    </div>
   )
  }

  const QuestionAnswer = (props) => {
    let qaData = sections[props.sectionNumber].data
    return(
      <div style={{ padding: '1em' }}>
        <div style={{ paddingBottom: '.5em', fontSize: '1.2rem', fontWeight: '600'}}>{sections[props.sectionNumber].topic}</div>
        {qaData.map((qa, index) => (
          <div key={index} style={{ padding: `${props.padding}`, fontSize: '1rem'}} >
            {props.bullet && <span style={{ fontSize: '1rem' }}>- </span>}
            <span style={{ fontSize: '1rem' }}>{qa.question}</span>
            <span style={{ paddingLeft: '1em', color: 'rgb(223, 246, 221)s', fontStyle: 'italic', fontSize: '.95rem', fontWeight: '500' }}>{(qa.answer == 'Github code') ? <a  style={{ fontSize: '1rem' }} href="https://github.com/nguyenterprises/PurpleSky/tree/master">{qa.answer}</a>  : qa.answer}</span>
          </div>
        ))}
      </div>
    )
  }

  // const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  // }

  return (
    <div id='about-page' style={{ width: '100%', margin: '0 auto'}}>
        <DataPoint sectionNumber={0} padding=".25em 1em" bullet={false} />
        <DataPoint sectionNumber={8} padding=".25em 1em" bullet={true}/>
        <DataPoint sectionNumber={1} padding=".25em 1em" bullet={true}/>
        <DataPoint sectionNumber={2} padding=".25em 1em" bullet={true}/>
        <DataPoint sectionNumber={3} padding=".25em 1em" bullet={true}/>
        <div style={{ padding: '1em'}}>
          <div style={{ paddingBottom: '.25em', fontSize: '1.2rem', fontWeight: '600'}}>{sections[4].topic}</div>
              <div style={{ padding: '.25em 1em', fontSize: '1rem' }}>
                {sections[4].data.point1}
              </div> 
              <div style={{ padding: '.5em 1em', fontSize: '1rem' }}>
                {sections[4].data.point2}<a  style={{ fontSize: '1rem' }} href={sections[4].data.link}>here.</a>{sections[4].data.point3}{sections[4].data.email}
              </div> 
        </div>
        <QuestionAnswer sectionNumber={5} padding=".25em 1em" bullet={true}/>
        <QuestionAnswer sectionNumber={6} padding=".25em 1em" bullet={true}/>
        
      
    </div>
  )
}
export default About
