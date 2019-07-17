/*
	URLフィルタクラス
*/
var UrlFilter = function( filterName, initUrlFilter ) {

	// フィルタ名称
	this.filterName = filterName;

	// マージ済みフィルタデータ
	this.urlFilter = initUrlFilter;

	// URLフィルタを空にする
	this.clearFilter = function() {
		try {
			this.urlFilter = {
				white: {
					  filters: []
					, methods: [ [], [], [], [] ]
				},
				black: {
					  filters: []
					, methods: [ [], [], [], [] ]
				}
			};
		}
		catch(e) {
		}
	};

	// フィルタの結合
	this.margeFilter = function( splitItem ) {

		// urlFilter
		var urlFilter = this.urlFilter;

		try {
			// ホワイトリスト結合
			if(typeof splitItem.white.methods !== 'undefined') {
				for ( var i = 0; i < urlFilter.white.methods.length; ++i ) {
					Array.prototype.push.apply( urlFilter.white.methods[ i ], splitItem.white.methods[ i ] );
				}
			}
			Array.prototype.push.apply( urlFilter.white.filters, splitItem.white.filters );
		}
		catch(e) {
		}

		try {
			// ブラックくリスト結合
			if(typeof splitItem.black.methods !== 'undefined') {
				for ( var i = 0; i < urlFilter.black.methods.length; ++i ) {
					Array.prototype.push.apply( urlFilter.black.methods[ i ], splitItem.black.methods[ i ] );
				}
			}
			Array.prototype.push.apply( urlFilter.black.filters, splitItem.black.filters );
		}
		catch(e) {
		}
	};

	/*
		指定されたフィルタリストに一致するかを調べる
			( aa || bb ) && cc && ddを処理する(||は全て括弧で囲まれているとして判定する)
	*/
	function isHitUrlFilterList( filterItem, url, method ) {

		// filterIndexs
		var filterIndexs = {};

		// indexsの取得
		var methodLower = method.toLowerCase();
		if ( "post" == methodLower ) {

			// POST
			filterIndexs = filterItem.methods[ 0 ];
		} else if ( "get" == methodLower ) {

			// GET
			filterIndexs = filterItem.methods[ 1 ];
		} else if ( "put" == methodLower ) {

			// PUT
			filterIndexs = filterItem.methods[ 2 ];
		}
		else {
			// その他
			filterIndexs = filterItem.methods[ 3 ];
		}

		// urlを小文字へ変換
		var urlLower = url.toLowerCase();

		// indexの数だけ処理する
		for (var i = 0; i < filterIndexs.length; ++i) {

			// フィルタインデックスに対応するフィルタが存在しない場合は不一致とする（フィルタの読み込み中）
			if ( filterItem.filters.length <= filterIndexs[ i ] ) {
				return false;
			}

			// フィルタ取得
			var filter = filterItem.filters[ filterIndexs[ i ] ];

			// 条件を満たしたか
			var match = false;

			// バージョンで分岐
			if ( 1 == filter.ver ) {

				// 一致フラグ
				var matchAnd = 1;
				var matchOr  = 0;
				var orCount  = 0;

				// or条件に一致したか

				// conditionの数だけ処理
				for (var j = 0; j < filter.conditions.length; ++j) {

					// 一致条件の取得
					var condition = filter.conditions[ j ];

					// 判定対象の文字列を小文字へ変換
					var matchStrLower = condition[ 2 ].toLowerCase();

					// 一致判定フラグ(テンポラリ)
					var matchTmp = 0;

					// 一致条件
					switch( condition[ 1 ] ) {
					case 0:		// "0=="
						{
							matchTmp = ( 0 == urlLower.indexOf( matchStrLower ) )? 1: 0;
						}
						break;

					case 1:		// "0<="
						{
							matchTmp = ( 0 <= urlLower.indexOf( matchStrLower ) )? 1: 0;
						}
						break;

					case -1:	// "-1=="
						{
							matchTmp = ( -1 == urlLower.indexOf( matchStrLower ) )? 1: 0;
						}
						break;
					}

					switch( condition[ 0 ] ) {
					case 0:	// "||"
						{
							matchOr |= matchTmp;
							orCount++;
						}
						break;

					case 1: // "&&"
						{
							matchAnd &= matchTmp;
						}
						break;
					}

					// and条件に１つでも一致しなければ判定終了
					if ( 0 == matchAnd ) {
						break;
					}
				}

				// 条件への一致判定
				if ( ( 0 == orCount && 0 != matchAnd ) || ( 0 <= orCount && 0 != matchOr && 0 != matchAnd ) ) {

					// 条件に一致
					return true;
				}
			}
		}

		// 条件に一致しなかった
		return false;
	};

	// フィルタに一致するかを調べる
	this.isHitList = function( url, method ) {

		try {
			var filter = this.urlFilter;

			// ホワイトリストチェック
			var ret = isHitUrlFilterList( filter.white, url, method );
			if ( false != ret ) {

				// ブラックリストチェック
				ret = ( false == isHitUrlFilterList( filter.black, url, method ) )? true : false;
			}
			return ret;
		}
		catch(e) {
		}

		return false;
	};
};



/*
	URLフィルタ管理クラス
*/
var UrlFilterManager = function() {

	// urlFilter
	var urlFilters = [];

	// URLフィルタの追加
	this.addUrlFilter = function( urlFilter ) {
		urlFilters.push( urlFilter );
	};

	// フィルタを空にする
	this.clearFilter = function( filterName ) {

		// 全フィルタ列挙
		for(var i = 0; i < urlFilters.length; ++i) {

			// フィルタ取得
			var urlFilter = urlFilters[ i ];

			// 追加するフィルタを名前で確認
			if ( urlFilter.filterName == filterName ) {

				// URLフィルタを空にする
				urlFilter.clearFilter();
				break;
			}
		}
	};

	// フィルタの結合
	this.margeFilter = function( filterName, filter ) {

		// 全フィルタ列挙
		for(var i = 0; i < urlFilters.length; ++i) {

			// フィルタ取得
			var urlFilter = urlFilters[ i ];

			// 追加するフィルタを名前で確認
			if ( urlFilter.filterName == filterName ) {

				// フィルタの結合
				urlFilter.margeFilter( filter );
				break;
			}
		}
	};
};



