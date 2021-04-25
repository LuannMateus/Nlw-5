import 'package:devquiz/core/core.dart';
import 'package:devquiz/shared/model/awnser_model.dart';
import 'package:flutter/material.dart';

class AwnserWidget extends StatelessWidget {
  final AwnserModel anwser;
  final bool isSelected;
  final bool disabled;
  final VoidCallback onTap;

  const AwnserWidget({
    required this.anwser,
    this.isSelected = false,
    this.disabled = false,
    required this.onTap,
  });

  Color get _selectedColorRight =>
      anwser.isRight ? AppColors.darkGreen : AppColors.darkRed;

  Color get _selectedBorderRight =>
      anwser.isRight ? AppColors.lightGreen : AppColors.lightRed;

  Color get _selectedColorCardRight =>
      anwser.isRight ? AppColors.lightGreen : AppColors.lightRed;

  Color get _selectedBorderCardRight =>
      anwser.isRight ? AppColors.green : AppColors.red;

  TextStyle get _selectedTextStyleRight =>
      anwser.isRight ? AppTextStyles.bodyDarkGreen : AppTextStyles.bodyDarkRed;

  IconData get _selectedIconRight => anwser.isRight ? Icons.check : Icons.close;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 4,
      ),
      child: IgnorePointer(
        ignoring: disabled,
        child: GestureDetector(
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isSelected ? _selectedColorCardRight : AppColors.white,
              borderRadius: BorderRadius.circular(10),
              border: Border.fromBorderSide(
                BorderSide(
                  color:
                      isSelected ? _selectedBorderCardRight : AppColors.border,
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Expanded(
                  child: Text(
                    anwser.title,
                    style: isSelected
                        ? _selectedTextStyleRight
                        : AppTextStyles.body,
                  ),
                ),
                Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: isSelected ? _selectedColorRight : AppColors.white,
                      borderRadius: BorderRadius.circular(500),
                      border: Border.fromBorderSide(
                        BorderSide(
                            color: isSelected
                                ? _selectedBorderRight
                                : AppColors.border),
                      ),
                    ),
                    child: isSelected
                        ? Icon(
                            _selectedIconRight,
                            color: Colors.white,
                            size: 16,
                          )
                        : null)
              ],
            ),
          ),
        ),
      ),
    );
  }
}
