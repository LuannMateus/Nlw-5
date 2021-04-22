import 'package:devquiz/core/core.dart';
import 'package:devquiz/views/challenge/widgets/awnser/awnser_widget.dart';
import 'package:flutter/material.dart';

class QuizWidget extends StatelessWidget {
  final String title;

  const QuizWidget({required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Text(
            title,
            style: AppTextStyles.heading,
          ),
          SizedBox(height: 24),
          AwnserWidget(
            title:
                "Possibilita a criação de aplicativos compilados nativamente",
            isRight: true,
            isSelected: true,
          ),
          AwnserWidget(
            title:
                "Possibilita a criação de aplicativos compilados nativamente",
            isRight: true,
            isSelected: true,
          ),
          AwnserWidget(
            title:
                "Possibilita a criação de aplicativos compilados nativamente",
            isRight: true,
            isSelected: true,
          ),
          AwnserWidget(
            title:
                "Possibilita a criação de aplicativos compilados nativamente",
            isRight: true,
            isSelected: true,
          ),
          AwnserWidget(
            title:
                "Possibilita a criação de aplicativos compilados nativamente",
            isRight: true,
            isSelected: true,
          )
        ],
      ),
    );
  }
}
