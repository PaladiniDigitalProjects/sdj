<?php
namespace WPML\Forms\WPForms;

class SmartTag {
	const SMART_TAG = '{form_name}';
	public static function process( $data, $formData, $properties = [ 'message' ] ) {
		$formName = wpforms_process_smart_tags(
			self::SMART_TAG, $formData
		);

		if ( is_array( $data ) ) {

			foreach ( $properties as $prop ) {
				if ( isset( $data[ $prop ] ) ) {

					$data[ $prop ] = self::replace( $formName, $data[ $prop ] );
				}
			}
		} else {

			$data = self::replace( $formName, $data );
		}

		return $data;
	}

	private static function replace( $replace, $text ) {
		return str_replace( self::SMART_TAG, $replace, $text );
	}
}
