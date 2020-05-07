import React, { Component } from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
// import ReEditor from 're-editor';
import diff from 'immutablediff';
// import 're-editor/lib/styles/index.css';
import Test from './tem/Test';

import {renderToString} from 'react-dom/server';

export default class DragTest extends Component<IProps, IState> {
  state = {
    data: [
      {
        name: 'zhaoxiuquan',
        id: 'darg-1'
      },
      {
        name: 'july',
        id: 'darg-2'
      },
      {
        name: 'zhuli',
        id: 'darg-3'
      }
    ],
    value: '',
    isShow: false
  }
  constructor(props) {
    super(props);
    let data:string = !localStorage.getItem('re-editor-value') ? '' : localStorage.getItem('re-editor-value') as string;
    
    // this.state = {
    //   data: [],
    //   value: JSON.parse(data),
    //   isShow: false
    // }
  }
  componentDidMount() {
    this.mapToHtml()
    // let data:string = !localStorage.getItem('re-editor-value') ? '' : localStorage.getItem('re-editor-value') as string;
    // console.log(JSON.parse(data))
    // this.setState({
    //   value: JSON.parse(data)
    // }, () => {
    //   this.setState({
    //     isShow: true
    //   })
    // })
  }

  /** 将字符串转换成html */
  mapToHtml = () => {
    const EmailHtml = renderToString(<Test />);
    console.log(EmailHtml)
    this.setState({
      value: EmailHtml
    })
  }

  handleOnDragStart = (a:any) => {
    console.log(a)
  }
  handleOnDragUpdate = () => {

  }
  handleOnDragEnd = (a:any) => {
    const {source, destination} = a;
    const {data} = this.state;

    let sourceArr = data.splice(source.index, 1);
    data.splice(destination.index, 0, sourceArr[0])
    this.setState({
      data
    })
  }

  get getGragItem() {
    return this.state.data.map((item, index) => {
      return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h4>{item.name}</h4>
            </div>
          )}
        </Draggable>
      )
    })
  }

  handleOnChange = (value) => {
    // console.log(value.toJS());
    // let html = diff(value);
    // console.log(html)
    this.setState({
      value: value
    })
    // localStorage.setItem('re-editor-value', JSON.stringify(value.toJS()));
  }

  render() {
    return (
      <div>
        <DragDropContext 
          onDragStart={this.handleOnDragStart}
          onDragUpdate={this.handleOnDragUpdate}
          onDragEnd={this.handleOnDragEnd}
        >
          <Droppable droppableId="droppable" type="COlUMN" direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={{ backgroundColor: snapshot.isDraggingOver ? '#FFFFFF' : 'red' }}
                {...provided.droppableProps}
              >
                {this.getGragItem}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Test />
        {/*<div dangerouslySetInnerHTML={{__html: this.state.value}}></div>*/}

      </div>
    )
  }
}

interface IProps {
  
}

interface IState {
  data: any[];
  value: any;
  isShow: boolean;
}
