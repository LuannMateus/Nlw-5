import 'package:devquiz/shared/model/question_model.dart';
import 'package:devquiz/views/challenge/challenge_controller.dart';
import 'package:devquiz/views/challenge/widgets/next_button/next_button_widget.dart';
import 'package:devquiz/views/challenge/widgets/question_indicator/question_indicator_widget.dart';
import 'package:devquiz/views/challenge/widgets/quiz/quiz_widget.dart';
import 'package:flutter/material.dart';

class ChallengePage extends StatefulWidget {
  final List<QuestionModel> questions;

  const ChallengePage({required this.questions});

  @override
  _ChallengePageState createState() => _ChallengePageState();
}

class _ChallengePageState extends State<ChallengePage> {
  final controller = ChallengeController();
  final pageController = PageController();

  @override
  initState() {
    super.initState();
    controller.currentPageNotifier.addListener(() {
      setState(() {});
    });

    pageController.addListener(() {
      setState(() {
        controller.currentPage = pageController.page!.toInt() + 1;
      });
    });
  }

  void nextPage() {
    if (controller.currentPage < widget.questions.length)
      pageController.nextPage(
        duration: Duration(milliseconds: 40),
        curve: Curves.ease,
      );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        child: SafeArea(
          top: true,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              BackButton(),
              ValueListenableBuilder<int>(
                valueListenable: controller.currentPageNotifier,
                builder: (context, value, _) => QuestionIndicatorWidget(
                  currentPage: value,
                  length: widget.questions.length,
                ),
              )
            ],
          ),
        ),
        preferredSize: Size.fromHeight(112),
      ),
      body: PageView(
        physics: NeverScrollableScrollPhysics(),
        controller: pageController,
        children: widget.questions
            .map((question) => QuizWidget(
                  question: question,
                  onChange: nextPage,
                ))
            .toList(),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 8,
          ),
          child: ValueListenableBuilder(
            valueListenable: controller.currentPageNotifier,
            builder: (context, value, _) => Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                if (controller.currentPage < widget.questions.length)
                  Expanded(
                      child: NextButtonWidget.white(
                    label: "Skip",
                    onTap: nextPage,
                  )),
                if (value == widget.questions.length) SizedBox(width: 7),
                if (value == widget.questions.length)
                  Expanded(
                      child: NextButtonWidget.green(
                    label: "Confirm",
                    onTap: () {
                      Navigator.pop(context);
                    },
                  )),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
