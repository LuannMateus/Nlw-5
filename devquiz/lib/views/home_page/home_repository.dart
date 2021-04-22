import 'dart:convert';

import 'package:devquiz/shared/model/quiz_model.dart';
import 'package:devquiz/shared/model/user_model.dart';
import 'package:flutter/services.dart';

class HomeRepository {
  Future<UserModel> getUser() async {
    final res = await rootBundle.loadString("database/user.json");
    final user = UserModel.fromJson(res);

    return user;
  }

  Future<List<QuizModel>> getQuizzes() async {
    final res = await rootBundle.loadString("database/quizzes.json");
    final list = jsonDecode(res) as List;

    final quizzes = list.map((quiz) => QuizModel.fromMap(quiz)).toList();

    return quizzes;
  }
}
