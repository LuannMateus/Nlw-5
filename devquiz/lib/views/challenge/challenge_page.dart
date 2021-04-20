import 'package:devquiz/views/challenge/widgets/question_indicator/question_indicator_widget.dart';
import 'package:devquiz/views/challenge/widgets/quiz/quiz_widget.dart';
import 'package:flutter/material.dart';

class ChallengePage extends StatefulWidget {
  @override
  _ChallengePageState createState() => _ChallengePageState();
}

class _ChallengePageState extends State<ChallengePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        child: SafeArea(
          top: true,
          child: QuestionIndicatorWidget(),
        ),
        preferredSize: Size.fromHeight(80),
      ),
      body: QuizWidget(
        title: "O que o Flutter faz em sua totalidade?",
      ),
    );
  }
}
