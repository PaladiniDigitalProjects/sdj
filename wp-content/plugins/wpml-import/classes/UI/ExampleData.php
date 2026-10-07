<?php

namespace WPML\Import\UI;

use WPML\Collect\Support\Collection;
use WPML\FP\Obj;
use WPML\FP\Relation;
use WPML\Import\Fields;

class ExampleData {

	const COLUMN_TITLE = 'title';

	const TITLE_MAP = [
		'af'      => 'Item %s',
		'ar'      => 'عنصر %s',
		'az'      => 'Maddə %s',
		'be'      => 'Элемент %s',
		'bg'      => 'Елемент %s',
		'bn'      => 'আইটেম %s',
		'bs'      => 'Stavka %s',
		'ca'      => 'Element %s',
		'cs'      => 'Položka %s',
		'cy'      => 'Eitem %s',
		'da'      => 'Vare %s',
		'de'      => 'Artikel %s',
		'el'      => 'Στοιχείο %s',
		'en'      => 'Item %s',
		'eo'      => 'Ero %s',
		'es'      => 'Artículo %s',
		'et'      => 'Üksus %s',
		'eu'      => 'Elementua %s',
		'fa'      => 'مورد %s',
		'fi'      => 'Kohde %s',
		'fo'      => 'Liður %s',
		'fr'      => 'Article %s',
		'ga'      => 'Mír %s',
		'gl'      => 'Elemento %s',
		'he'      => 'פריט %s',
		'hi'      => 'आइटम %s',
		'hr'      => 'Stavka %s',
		'hu'      => 'Tétel %s',
		'hy'      => 'Տարր %s',
		'id'      => 'Item %s',
		'is'      => 'Liður %s',
		'it'      => 'Articolo %s',
		'ja'      => '項目 %s',
		'ka'      => 'ელემენტი %s',
		'km'      => 'ធាតុ %s',
		'ko'      => '항목 %s',
		'ku'      => 'Tişt %s',
		'lt'      => 'Elementas %s',
		'lv'      => 'Vienība %s',
		'mg'      => 'Zavatra %s',
		'mk'      => 'Ставка %s',
		'mn'      => 'Зүйл %s',
		'ms'      => 'Item %s',
		'mt'      => 'Oġġett %s',
		'nb'      => 'Vare %s',
		'ne'      => 'वस्तु %s',
		'no'      => 'Vare %s',
		'nn'      => 'Vare %s',
		'nl'      => 'Item %s',
		'pa'      => 'ਆਈਟਮ %s',
		'pl'      => 'Pozycja %s',
		'pt-br'   => 'Item %s',
		'pt-pt'   => 'Item %s',
		'qu'      => 'Unuq %s',
		'ro'      => 'Articol %s',
		'ru'      => 'Элемент %s',
		'si'      => 'අයිතමය %s',
		'sk'      => 'Položka %s',
		'sl'      => 'Element %s',
		'so'      => 'Shay %s',
		'sq'      => 'Artikull %s',
		'sr'      => 'Ставка %s',
		'su'      => 'Item %s',
		'sv'      => 'Artikel %s',
		'ta'      => 'உருப்படி %s',
		'tg'      => 'Мавод %s',
		'th'      => 'รายการ %s',
		'tr'      => 'Öğe %s',
		'ug'      => 'تۈر %s',
		'uk'      => 'Елемент %s',
		'ur'      => 'آئٹم %s',
		'uz'      => 'Element %s',
		'vi'      => 'Mục %s',
		'zh-hans' => '项目 %s',
		'zh-hant' => '項目 %s',
	];


	private $sitepress;

	public function __construct( \SitePress $sitepress ) {
		$this->sitepress = $sitepress;
	}

	public function get() {
		return [
			'columns'      => self::getTableColumns(),
			'dataSource'   => self::getTableDataSource(),
			'languageList' => $this->getActiveLanguages( 'display_name' )->implode( ', ' ),
		];
	}

	private function getTableColumns() {
		return wpml_collect(
			[
				'title',
				Fields::TRANSLATION_GROUP,
				Fields::LANGUAGE_CODE,
				Fields::SOURCE_LANGUAGE_CODE,
				Fields::FINAL_POST_STATUS,
			]
		)->map(
			function ( $name ) {
				return (object) [
					'dataIndex'        => $name,
					self::COLUMN_TITLE => $name,
					'fixed'            => 'title' === $name ? 'left' : false,
				];
			}
		)->toArray();
	}

	private function getTableDataSource() {
		$data = [];

		$activeCodes = $this->getActiveLanguages( 'code' )->toArray();

		foreach ( [
			1 => 'A',
			2 => 'B',
		] as $trGroup => $item ) {
			foreach ( $activeCodes as $code ) {
				$data[] = $this->getTableRow( $item, $trGroup, $code );
			}
		}

		return $data;
	}

	private function getTableRow( $item, $trGroup, $lang ) {
		static $key = 0;

		$postTitle = isset( self::TITLE_MAP[ $lang ] )
			? sprintf( self::TITLE_MAP[ $lang ], $item )
			: sprintf( '[%s] Item %s', $lang, $item );

		$defaultLang = $this->sitepress->get_default_language();
		$sourceLang  = $lang === $defaultLang ? null : $defaultLang;

		return (object) [
			'key'                        => $key++,
			self::COLUMN_TITLE           => $postTitle,
			Fields::TRANSLATION_GROUP    => $trGroup,
			Fields::LANGUAGE_CODE        => $lang,
			Fields::SOURCE_LANGUAGE_CODE => $sourceLang,
			Fields::FINAL_POST_STATUS    => 'published',
			'isRTL'                      => $this->sitepress->is_rtl( $lang ),
		];
	}

	private function getActiveLanguages( $prop ) {
		return wpml_collect( $this->sitepress->get_active_languages() )
			->prioritize( Relation::propEq( 'code', $this->sitepress->get_default_language() ) )
			->map( Obj::prop( $prop ) );
	}
}
