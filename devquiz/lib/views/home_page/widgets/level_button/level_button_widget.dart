import 'package:devquiz/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:google_fonts/google_fonts.dart';

class LevelButtonWidget extends StatelessWidget {
  final String label;
  LevelButtonWidget({Key key, @required this.label})
      : assert(["Easy", "Midle", "Hard", "Expert"].contains(label)),
        super(key: key);

  final config = {
    "Easy": {
      "color": AppColors.levelButtonFacil,
      "borderColor": AppColors.levelButtonBorderFacil,
      "fontColor": AppColors.levelButtonTextFacil
    },
    "Midle": {
      "color": AppColors.levelButtonMedio,
      "borderColor": AppColors.levelButtonBorderMedio,
      "fontColor": AppColors.levelButtonTextMedio
    },
    "Hard": {
      "color": AppColors.levelButtonDificil,
      "borderColor": AppColors.levelButtonBorderDificil,
      "fontColor": AppColors.levelButtonTextDificil
    },
    "Expert": {
      "color": AppColors.levelButtonPerito,
      "borderColor": AppColors.levelButtonBorderPerito,
      "fontColor": AppColors.levelButtonTextPerito
    }
  };

  Color get color => config[label]['color'];
  Color get borderColor => config[label]['borderColor'];
  Color get fontColor => config[label]['fontColor'];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        border: Border.fromBorderSide(
          BorderSide(color: borderColor),
        ),
        borderRadius: BorderRadius.circular(28),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 6),
        child: Text(
          label,
          style: GoogleFonts.notoSans(color: fontColor, fontSize: 13),
        ),
      ),
    );
  }
}
