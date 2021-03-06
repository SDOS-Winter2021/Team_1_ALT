import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import moment from 'moment';
import database from '@react-native-firebase/database';
import QuizFacultyPage from './QuizFacultyPage';
import QuizStudentPage from './QuizStudentPage';

export default class QuizHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.route.params.type,
            course : this.props.route.params.course,
            user : this.props.route.params.user,
            currentQuiz : false,
            currentDuration : 0,
            quizType:"",
            questionCount : 0
        };
        this.setQuizState = this.setQuizState.bind(this);
    }

    setQuizState(){
        this.setState({
          currentQuiz : false,
        })
    }

    ifCurrentQuiz = ()=>{
        database()
            .ref('InternalDb/KBC/')
            .orderByChild('passCode')
            .equalTo(this.state.course.passCode)
            .on('value', snapshot => {
                if (snapshot.val()){
                    const values = Object.values(snapshot.val())[0]
                    const curr = moment(database().getServerTime())
                    const startTime = moment(values['startTime'], "DD/MM/YYYY HH:mm:ss")
                    const endTime = moment(values['endTime'], "DD/MM/YYYY HH:mm:ss")
                    const duration = Math.abs(moment(curr).diff(endTime, "seconds"))

                    if (curr >= startTime && curr <= endTime){
                        this.setState({
                            currentQuiz : true,
                            currentDuration : duration,
                            quizType: values['quizType'],
                            questionCount : values['questionCount']
                        })
                    }
                    else{
                        this.setState({
                            currentQuiz : false,
                            currentDuration : 0,
                            quizType: values['quizType'],
                            questionCount : values['questionCount']
                        })
                    }
                }
            })
    }

    componentDidMount(){
        this.ifCurrentQuiz()
    }

    render(){
        return(
            <SafeAreaView style={styles.safeContainer}>
                {this.state.type === "faculty" ?
                    <QuizFacultyPage
                        currentQuiz = {this.state.currentQuiz}
                        currentDuration = {this.state.currentDuration}
                        user = {this.state.user}
                        course = {this.state.course}
                        setQuizState = {this.setQuizState}
                        quizType = {this.state.quizType}
                        questionCount = {this.state.questionCount}
                    />
                :
                    <QuizStudentPage
                        currentQuiz = {this.state.currentQuiz}
                        currentDuration = {this.state.currentDuration}
                        user = {this.state.user}
                        course = {this.state.course}
                        setQuizState = {this.setQuizState}
                        quizType = {this.state.quizType}
                    />
                }
            </SafeAreaView>

        )
    }

}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
    },

})
