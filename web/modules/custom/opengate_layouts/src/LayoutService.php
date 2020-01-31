<?php

namespace Drupal\opengate_layouts;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\StringTranslation\TranslationInterface;

/**
 * Class LayoutService.
 */
class LayoutService {

  use StringTranslationTrait;

  /**
   * Constructs a LayoutService object.
   *
   * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
   *   The string translation service.
   */
  public function __construct(TranslationInterface $string_translation) {
    $this->stringTranslation = $string_translation;
  }

  public function getBackgroundColors() {
    return [
      'layout--background--none' => $this->t('None'),
      'layout--background--white' => $this->t('White'),
      'layout--background--black' => $this->t('Black'),
      'layout--opengate--background--grey' => $this->t('Grey'),
      'layout--opengate--background--primary' => $this->t('Primary'),
      'layout--opengate--background--secondary' => $this->t('Secondary'),
    ];
  }

}
