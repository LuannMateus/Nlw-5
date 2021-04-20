import 'package:devquiz/core/core.dart';
import 'package:flutter/material.dart';

class ProgressIndicatorWidget extends StatelessWidget {
  final double value;

  const ProgressIndicatorWidget({@required this.value});

  @override
  Widget build(BuildContext context) {
    return LinearProgressIndicator(
      value: 0.3,
      backgroundColor: AppColors.chartSecondary,
      valueColor: AlwaysStoppedAnimation<Color>(AppColors.chartPrimary),
    );
  }
}
