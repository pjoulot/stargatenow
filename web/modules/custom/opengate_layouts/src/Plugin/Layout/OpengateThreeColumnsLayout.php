<?php

namespace Drupal\opengate_layouts\Plugin\Layout;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\layout_builder_base_library\Plugin\Layout\BaseThreeColumnsLayout;
use Drupal\opengate_layouts\LayoutService;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configurable layout plugin class.
 *
 * @internal
 *   Plugin classes are internal.
 */
class OpengateThreeColumnsLayout extends BaseThreeColumnsLayout implements ContainerFactoryPluginInterface {

  /**
   * @var Drupal\opengate_layouts\LayoutService $opengateLayout
   *   The opengate layout service.
   */
  protected $opengateLayout;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   * @param \Drupal\opengate_layouts\LayoutService $layout
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ConfigFactoryInterface $config_factory, ModuleHandlerInterface $module_handler, LayoutService $layout) {
    $this->opengateLayout = $layout;
    parent::__construct($configuration, $plugin_id, $plugin_definition, $config_factory, $module_handler);
  }

  /**
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   *
   * @return static
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory'),
      $container->get('module_handler'),
      $container->get('opengate_layouts.layout')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getBackgroundOptions() {
    return $this->opengateLayout->getBackgroundColors();
  }

}
