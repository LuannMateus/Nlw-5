import 'package:devquiz/core/core.dart';
import 'package:devquiz/views/home_page/home_controller.dart';
import 'package:devquiz/views/home_page/home_state.dart';
import 'package:devquiz/views/home_page/widgets/app_bar/app_bar_widget.dart';
import 'package:devquiz/views/home_page/widgets/level_button/level_button_widget.dart';
import 'package:devquiz/views/home_page/widgets/quiz_card/quiz_card_widget.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final controller = HomeController();

  @override
  initState() {
    super.initState();

    controller.getUser();
    controller.getQuizzes();
    controller.stateNotifier.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    if (controller.state == HomeState.success)
      return Scaffold(
        appBar: AppBarWidget(
          user: controller.user!,
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  LevelButtonWidget(label: 'Easy'),
                  LevelButtonWidget(label: 'Midle'),
                  LevelButtonWidget(label: 'Hard'),
                  LevelButtonWidget(label: 'Expert')
                ],
              ),
              SizedBox(height: 16),
              Expanded(
                child: GridView.count(
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  crossAxisCount: 2,
                  children: controller.quizzes!
                      .map((quiz) => QuizCardWidget(
                            title: quiz.title,
                            percent:
                                quiz.questionAnswered / quiz.questions.length,
                            completed:
                                "${quiz.questionAnswered}/${quiz.questions.length}",
                          ))
                      .toList(),
                ),
              )
            ],
          ),
        ),
      );
    else
      return Scaffold(
        body: Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.darkGreen),
          ),
        ),
      );
  }
}
